import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { UserRepositoryType } from '../domain/repositories/user-repository.types';
import { PrismaUserRepository } from './prisma/user.repository';
import { UsersController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepositoryType.UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    UserRepositoryType.UserRepository,
    CreateUserUseCase,
    ListUsersUseCase,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
