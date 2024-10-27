import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../shared/constants/jwt.constants';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/infrastructure/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    PrismaModule,
  ],
  providers: [LoginUseCase],
  exports: [LoginUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
