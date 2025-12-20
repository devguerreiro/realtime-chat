import { Controller, Get, Query } from '@nestjs/common';

import { GetMessagesQuery, ListMessageDTO } from './chat.dto';

import { MessageService } from './message/message.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly messageService: MessageService) {}

  @Get('messages')
  async getMessages(
    @Query() query: GetMessagesQuery,
  ): Promise<ListMessageDTO[]> {
    const { roomName, limit, offset } = query;

    return await this.messageService.getByRoomName(roomName, limit, offset);
  }
}
