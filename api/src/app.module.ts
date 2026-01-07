import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

import { ChatModule } from './domains/chat/chat.module';

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
  ],
})
export class AppModule {}
