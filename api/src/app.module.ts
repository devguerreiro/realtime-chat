import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

import { ChatModule } from './chat/chat.module';
import { MSChatModule } from './microservices/chat/chat.module';

@Module({
  imports: [
    CacheModule.register({
      useFactory: () => {
        return {
          stores: [new KeyvRedis('redis://localhost:6379')],
        };
      },
      isGlobal: true,
    }),
    ChatModule,
    MSChatModule,
  ],
})
export class AppModule {}
