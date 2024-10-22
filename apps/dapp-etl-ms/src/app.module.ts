import { Module } from '@nestjs/common';
import { MessagesModule } from './modules/messages/messages.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [MessagesModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
