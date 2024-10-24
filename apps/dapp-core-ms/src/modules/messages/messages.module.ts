import { Module } from '@nestjs/common';
import { MessagesController } from './infraestructure/controller/messages.controller';
import { SaveMessageUseCase } from './application/use-cases/save-message.use-case';
import { MessageRepositoryImpl } from './domain/repositories/message.repository';
import { PrismaService } from './domain/repositories/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [SaveMessageUseCase, MessageRepositoryImpl, PrismaService],
})
export class MessagesModule {}
