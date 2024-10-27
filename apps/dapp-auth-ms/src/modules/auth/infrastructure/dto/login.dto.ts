import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    { message: 'El correo debe ser una dirección de correo válida.' },
  )
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;
}
