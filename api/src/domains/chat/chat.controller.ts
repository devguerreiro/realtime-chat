import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { QueryFailedError } from 'typeorm';

import { MessageService } from '@/domains/message/message.service';
import { RoomService } from '@/domains/room/room.service';
import { UserService } from '@/domains/user/user.service';
import { CacheService } from '@/domains/cache/cache.service';

import {
  ListRoomDTO,
  NewMessageDTO,
  NewRoomDTO,
  RoomDTO,
} from '@/dtos/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}

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
      const room = await this.roomService.create(data);

      return {
        name: room.name,
      };
    } catch (e: unknown) {
      if (e instanceof QueryFailedError) {
        throw new HttpException('room already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @EventPattern('chat:room:new-message')
  async onNewMessage(@Body() message: NewMessageDTO) {
    const room = await this.roomService.getByName(message.roomName);

    if (room === null) {
      throw new HttpException('room does not exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getByUsername(message.username);

    if (user === null) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    const createdMessage = await this.messageService.create(
      message.content,
      message.timestamp,
      room,
      user,
    );

    await this.cacheService.appendMessage(message.roomName, createdMessage);
  }
}
