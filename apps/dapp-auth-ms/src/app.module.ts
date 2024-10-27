import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { UsersModule } from './modules/users/infrastructure/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
