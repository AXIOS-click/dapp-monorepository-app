import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Role } from '../../domain/aggregates/roles.aggregate';
import { IRolesRepository } from '../../domain/repositories/IRoles.repository';

@Injectable()
export class PrismaRoleRepository implements IRolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany();

    const mappedRoles = roles.map((role) => role.name);

    return roles.map((role) => new Role(role.id, role.name, mappedRoles));
  }
}
