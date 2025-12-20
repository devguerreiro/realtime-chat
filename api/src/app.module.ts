import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ChatModule } from './chat/chat.module';
import { MSChatModule } from './microservices/chat/chat.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), ChatModule, MSChatModule],
})
export class AppModule {}
