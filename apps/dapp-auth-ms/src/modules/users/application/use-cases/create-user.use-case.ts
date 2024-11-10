import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../../domain/aggregates/user.aggregate';
import { UserRepositoryType } from '../../domain/repositories/user-repository.types';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExistsException';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryType.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }
}
