import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { RolesModule } from './modules/roles/infrastructure/roles.module';
import { UsersModule } from './modules/users/infrastructure/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
