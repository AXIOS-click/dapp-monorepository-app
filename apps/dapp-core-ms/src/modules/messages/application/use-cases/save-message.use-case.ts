import { Injectable } from '@nestjs/common';
import { MessageRepositoryImpl } from '../../domain/repositories/message.repository';

@Injectable()
export class SaveMessageUseCase {
  constructor(private readonly messageRepository: MessageRepositoryImpl) {}

  async getMessagesByFilters(filters: any, page: number, limit: number) {
    return this.messageRepository.findMessages(filters, page, limit);
  }
}
