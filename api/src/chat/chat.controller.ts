import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { MessageDTO, NewMessageDTO } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private service: ChatService) {}

  @Post('message')
  newMessage(@Body() message: NewMessageDTO) {
    return this.service.newMessage(message);
  }

  @Get('messages')
  async getAllMessages(@Query('roomId') roomId: string): Promise<MessageDTO[]> {
    return await this.service.getMessagesByRoomId(roomId);
  }
}
