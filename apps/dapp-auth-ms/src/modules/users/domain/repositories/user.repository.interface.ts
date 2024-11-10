import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { UpdateUserDto } from '../../infrastructure/dto/update-user.dto';
import { User } from '../aggregates/user.aggregate';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  delete(userId: string): Promise<void>;
  findById(userId: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
