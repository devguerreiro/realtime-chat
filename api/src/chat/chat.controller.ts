import { Controller, Get, Query } from '@nestjs/common';

import { MessageDTO } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private service: ChatService) {}

  @Get('messages')
  async getAllMessages(@Query('roomId') roomId: string): Promise<MessageDTO[]> {
    return await this.service.getMessagesByRoomId(roomId);
  }
}
