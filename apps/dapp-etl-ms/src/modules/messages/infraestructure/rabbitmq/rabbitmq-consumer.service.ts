import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Channel, connect } from 'amqplib';
import { SaveMessageUseCase } from '../../application/use-cases/save-message.use-case';
import { MessageRepositoryImpl } from '../../domain/repositories/message.repository';

@Injectable()
export class RabbitMQConsumerService implements OnModuleInit {
  private channel: Channel;

  constructor(
    private readonly configService: ConfigService,
    private readonly saveMessageUseCase: SaveMessageUseCase,
    private readonly messageRepository: MessageRepositoryImpl,
  ) {}

  async onModuleInit() {
    const rabbitUrl = this.configService.get<string>('RABBITMQ_URL');
    const connection = await connect(rabbitUrl);
    this.channel = await connection.createChannel();

    const queue = 'data_plc';
    await this.channel.assertQueue(queue, { durable: true });

    console.log(`Listening on queue: ${queue}`);

    this.channel.consume(queue, async (msg) => {
      try {
        const content = JSON.parse(msg.content.toString());

        const { d } = content;
        await this.saveMessageUseCase.execute(content);
        console.log('Message processed:', d.companyCode, d.subCompanyCode);
        this.channel.ack(msg);
      } catch (error) {
        console.error(
          'Error parsing message:',
          error.message,
          msg.content.toString(),
        );
        await this.messageRepository.saveErrorLog(
          msg.content.toString(),
          error.message,
        );
      }
    });
  }
}
