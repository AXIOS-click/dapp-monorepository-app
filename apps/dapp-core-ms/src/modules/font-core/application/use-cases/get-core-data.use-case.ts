import { Injectable } from '@nestjs/common';
import { DataRepository } from '../../domain/repositorie/DataCore.repository';

@Injectable()
export class GetCoreDataUseCase {
  constructor(private readonly dataRepository: DataRepository) {}

  async getAllData() {
    return await this.dataRepository.findAllData();
  }
}
