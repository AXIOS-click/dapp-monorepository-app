import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepositoryType } from '../../domain/repositories/user-repository.types';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from '../../infrastructure/dto/update-user.dto';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepositoryType.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, data: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (data.password) {
      data.password = await bcrypt.hash(user.password, 10);
    }

    return await this.userRepository.update(id, data);
  }
}
