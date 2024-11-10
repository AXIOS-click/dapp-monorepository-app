import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryType } from '../../domain/repositories/user-repository.types';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(UserRepositoryType.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
