import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatModule {}
