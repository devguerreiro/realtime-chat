import { Module } from '@nestjs/common';

import { UserModule } from '@/domains/user/user.module';
import { CacheModule } from '@/domains/cache/cache.module';

import { MessageService } from '@/domains/message/message.service';
import { RoomService } from '@/domains/room/room.service';

import { MessageRepository } from '@/domains/message/message.repository';
import { RoomRepository } from '@/domains/room/room.repository';

import { ChatController } from './chat.controller';

@Module({
  imports: [UserModule, CacheModule],
  controllers: [ChatController],
  providers: [MessageService, MessageRepository, RoomService, RoomRepository],
  exports: [MessageService, RoomService],
})
export class ChatModule {}
