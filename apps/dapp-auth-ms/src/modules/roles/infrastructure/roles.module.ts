import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { GetRolesUseCase } from '../application/use-cases/get-roles.use-case';
import { RoleRepositoryType } from '../domain/repositories/role-repository.types';
import { PrismaRoleRepository } from './repositories/roles.repository';
import { RoleController } from './role.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    GetRolesUseCase,
    {
      provide: RoleRepositoryType.IRolesRepository,
      useClass: PrismaRoleRepository,
    },
  ],
  exports: [GetRolesUseCase],
})
export class RolesModule {}
