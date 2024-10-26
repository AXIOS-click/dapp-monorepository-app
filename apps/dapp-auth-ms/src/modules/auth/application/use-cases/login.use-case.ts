import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/aggregates/user.aggregate';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return this.jwtService.sign(payload);
  }
}
