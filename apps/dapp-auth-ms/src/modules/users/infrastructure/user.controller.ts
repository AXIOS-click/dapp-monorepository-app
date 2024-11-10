// users.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
  //   return this.updateUserUseCase.execute(id, data);
  // }

  @Get()
  async listUsers() {
    return this.listUsersUseCase.execute();
  }
}
