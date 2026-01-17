import { Module } from '@nestjs/common';
import { CacheModule as BaseCacheModule } from '@nestjs/cache-manager';

import KeyvRedis from '@keyv/redis';

import { CacheService } from './cache.service';

@Module({
  imports: [
    BaseCacheModule.register({
      useFactory: () => {
        return {
          stores: [new KeyvRedis('redis://localhost:6379')],
        };
      },
      isGlobal: true,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
