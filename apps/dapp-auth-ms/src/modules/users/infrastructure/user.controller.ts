// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  @Get()
  async listUsers() {
    return this.listUsersUseCase.execute();
  }
}
