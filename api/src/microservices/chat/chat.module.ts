import { Module } from '@nestjs/common';

import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from 'src/cache/cache.module';

import { MSChatController } from './chat.controller';

@Module({
  imports: [ChatModule, UserModule, CacheModule],
  controllers: [MSChatController],
})
export class MSChatModule {}
