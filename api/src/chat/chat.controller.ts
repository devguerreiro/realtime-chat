import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { QueryFailedError } from 'typeorm';

import { PaginatedQuery } from 'src/base.dto';

import { ListMessageDTO, ListRoomDTO, NewRoomDTO, RoomDTO } from './chat.dto';

import { MessageService } from './message/message.service';
import { RoomService } from './room/room.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  @Get('room/:roomName/messages')
  async getMessages(
    @Param('roomName') roomName: string,
    @Query() query: PaginatedQuery,
  ): Promise<ListMessageDTO[]> {
    const { limit, offset } = query;

    const room = await this.roomService.getRoomByName(roomName);

    if (!room) {
      throw new HttpException('room does not exist', HttpStatus.NOT_FOUND);
    }

    const messages = await this.messageService.getByRoomName(
      roomName,
      limit,
      offset,
    );

    return messages.map((message) => ({
      username: message.user.username,
      content: message.content,
      timestamp: message.timestamp,
    }));
  }

  @Get('room')
  async getRooms(): Promise<ListRoomDTO[]> {
    const rooms = await this.roomService.getAll();

    return rooms.map((room) => ({
      name: room.name,
    }));
  }

  @Post('room')
  async newRoom(@Body() data: NewRoomDTO): Promise<RoomDTO | void> {
    try {
      const room = await this.roomService.createRoom(data);

      return {
        name: room.name,
      };
    } catch (e: unknown) {
      if (e instanceof QueryFailedError) {
        throw new HttpException('room already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
