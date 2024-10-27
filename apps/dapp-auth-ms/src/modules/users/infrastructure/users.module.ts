import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/user.repository';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UserRepositoryType } from '../domain/repositories/user-repository.types';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepositoryType.UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepositoryType.UserRepository, CreateUserUseCase],
})
export class UsersModule {}
