import { Module } from '@nestjs/common';

import { ChatModule } from './modules/chat/chat.module';
import { CacheModule } from '@lib/cache/cache.module';

@Module({
  imports: [ChatModule, CacheModule],
})
export class AppModule {}
