import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from '../../domain/aggregates/user.aggregate';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

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

    const userData = await this.prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password,
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

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        roles: data.roles
          ? { set: data.roles.map((roleId) => ({ id: roleId })) }
          : undefined,
      },
      include: {
        roles: true,
      },
    });

    return new User(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.roles.map((role) => role.name),
    );
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
