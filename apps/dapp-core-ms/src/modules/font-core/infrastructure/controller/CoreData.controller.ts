import { Controller, Get } from '@nestjs/common';
import { GetCoreDataUseCase } from 'src/modules/font-core/application/use-cases/get-core-data.use-case';

@Controller('core-data')
export class CoreDataController {
  constructor(private readonly dataService: GetCoreDataUseCase) {}

  @Get('config-schematics')
  async getAllData() {
    return await this.dataService.getAllData();
  }
}
