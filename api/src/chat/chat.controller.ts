import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { GetMessagesQuery, ListMessageDTO, NewMessageDTO } from './chat.dto';

import { UserService } from 'src/user/user.service';

import { RoomService } from './room/room.service';
import { MessageService } from './message/message.service';

@Controller('chat')
export class ChatController {
  constructor(
    private messageService: MessageService,
    private roomService: RoomService,
    private userService: UserService,
  ) {}

  @EventPattern('chat:room:new-message')
  async newMessage(@Body() message: NewMessageDTO) {
    const room = await this.roomService.getRoomByName(message.roomName);

    if (room === null) {
      throw new HttpException('room does not exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getByUsername(message.username);

    if (user === null) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    console.debug(
      `a new message from ${message.username} was saved in the database`,
    );

    return this.messageService.create(
      message.content,
      message.timestamp,
      room,
      user,
    );
  }

  @Get('messages')
  async getMessages(
    @Query() query: GetMessagesQuery,
  ): Promise<ListMessageDTO[]> {
    const { roomName, limit, offset } = query;

    const messages = await this.messageService.getByRoomName(
      roomName,
      limit,
      offset,
    );

    console.debug(`got ${messages.length} messages`);

    return messages.map((message) => {
      const mapper = new ListMessageDTO();
      return mapper.fromEntity(message);
    });
  }
}
