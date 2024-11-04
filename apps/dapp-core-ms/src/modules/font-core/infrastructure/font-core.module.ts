import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/messages/domain/repositories/prisma.service';
import { GetCoreDataUseCase } from '../application/use-cases/get-core-data.use-case';
import { DataRepository } from '../domain/repositorie/DataCore.repository';
import { CoreDataController } from './controller/CoreData.controller';

@Module({
  imports: [],
  controllers: [CoreDataController],
  providers: [GetCoreDataUseCase, DataRepository, PrismaService],
})
export class FontCoreModule {}
