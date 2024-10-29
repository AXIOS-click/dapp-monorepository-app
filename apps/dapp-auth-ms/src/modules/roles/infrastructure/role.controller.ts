import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetRolesUseCase } from '../application/use-cases/get-roles.use-case';
import { Role } from '../domain/aggregates/roles.aggregate';

@Controller('role')
export class RoleController {
  constructor(private readonly getRoles: GetRolesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async login(): Promise<{ data: Role[] }> {
    const data = await this.getRoles.execute();
    return { data };
  }
}
