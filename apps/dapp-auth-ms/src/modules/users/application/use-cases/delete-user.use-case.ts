import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryType } from '../../domain/repositories/user-repository.types';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepositoryType.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.delete(id);
  }
}
