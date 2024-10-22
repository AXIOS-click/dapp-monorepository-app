import { Module } from '@nestjs/common';
import { RabbitMQConsumerService } from './infraestructure/rabbitmq/rabbitmq-consumer.service';
import { SaveMessageUseCase } from './application/use-cases/save-message.use-case';
import { MessageRepositoryImpl } from './domain/repositories/message.repository';
import { PrismaService } from './domain/repositories/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MessagesController } from './infraestructure/controller/messages.controller';

@Module({
  controllers: [MessagesController],
  imports: [ConfigModule],
  providers: [
    RabbitMQConsumerService,
    SaveMessageUseCase,
    MessageRepositoryImpl,
    PrismaService,
  ],
})
export class MessagesModule {}
