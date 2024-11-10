import { Inject } from '@nestjs/common';
import { User } from '../../domain/aggregates/user.aggregate';
import { UserRepositoryType } from '../../domain/repositories/user-repository.types';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryType.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create(user);
  }
}
