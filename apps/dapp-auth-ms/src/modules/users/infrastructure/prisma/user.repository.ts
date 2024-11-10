import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from '../../domain/aggregates/user.aggregate';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const user = await this.prisma.user.findMany({
      include: { roles: true },
    });
    return user.map((user) => {
      const roleNames = user.roles.map((role) => role.name);

      return new User(
        user.id,
        user.name,
        user.lastName,
        user.email,
        user.password,
        roleNames,
      );
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    if (!user) return null;

    // Transformamos los roles en un array de strings (nombres de los roles)
    const roleNames = user.roles.map((role) => role.name);

    return new User(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      roleNames,
    );
  }

  async create(user: CreateUserDto): Promise<User> {
    const { name, lastName, email, password, roles } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await this.prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        roles: {
          connect: roles.map((roleId) => ({ id: roleId })), // Conectamos los roles
        },
      },
    });

    return new User(
      userData.id,
      userData.name,
      userData.lastName,
      userData.email,
      userData.password,
      roles,
    );
  }

  async update(user: User): Promise<User> {
    const { id, name, lastName, email, password, roles } = user;

    await this.prisma.user.update({
      where: { id },
      data: {
        name,
        lastName,
        email,
        password,
        roles: {
          set: [], // Limpiamos las relaciones existentes
          connect: roles.map((roleId) => ({ id: roleId })), // Conectamos los nuevos roles
        },
      },
    });

    return user;
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true }, // Incluimos los roles en la respuesta
    });

    if (!user) return null;

    // Transformamos los roles en un array de strings (nombres de los roles)
    const roleNames = user.roles.map((role) => role.name);

    return new User(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      roleNames,
    );
  }
}
