import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('El usuario ya existe', HttpStatus.CONFLICT);
  }
}
