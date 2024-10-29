import { Inject } from '@nestjs/common';
import { Role } from '../../domain/aggregates/roles.aggregate';
import { IRolesRepository } from '../../domain/repositories/IRoles.repository';
import { RoleRepositoryType } from '../../domain/repositories/role-repository.types';

export class GetRolesUseCase {
  constructor(
    @Inject(RoleRepositoryType.IRolesRepository)
    private readonly roleRepository: IRolesRepository,
  ) {}
  async execute(): Promise<Role[]> {
    return this.roleRepository.getAllRoles();
  }
}
