import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { CacheModule } from 'src/cache/cache.module';

import { ChatController } from './chat.controller';

import { MessageService } from './message/message.service';
import { RoomService } from './room/room.service';

import { MessageRepository } from './message/message.repository';
import { RoomRepository } from './room/room.repository';

@Module({
  imports: [UserModule, CacheModule],
  controllers: [ChatController],
  providers: [MessageService, MessageRepository, RoomService, RoomRepository],
  exports: [MessageService, RoomService],
})
export class ChatModule {}
