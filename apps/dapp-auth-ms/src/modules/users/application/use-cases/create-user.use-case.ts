import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/aggregates/user.aggregate';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
}
