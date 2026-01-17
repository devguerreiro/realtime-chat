import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import type { RoomRepository } from '@lib/core/application/ports/repositories/room.repository';
import type { CacheService } from '@lib/core/application/ports/services/cache.service';

import { RoomCacheService } from '@lib/core/application/services/room/cache.service';

import { FindAllRoomsUseCase } from '@lib/core/application/use-cases/room/find-all-rooms.usecase';

import {
  ListRoomDTO,
  NewMessageDTO,
  NewRoomDTO,
  RoomDTO,
} from '@app/api/dtos/chat.dto';

import { CACHE_SERVICE, ROOM_REPOSITORY } from '@app/api/tokens';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository,

    @Inject(CACHE_SERVICE)
    private readonly cacheService: CacheService,
  ) {}

  @Get('room')
  async getRooms(): Promise<ListRoomDTO[]> {
    const roomCacheService = new RoomCacheService(this.cacheService);

    const findAllRooms = new FindAllRoomsUseCase(
      this.roomRepository,
      roomCacheService,
    );

    const rooms = await findAllRooms.execute();

    return rooms.map((room) => {
      return {
        name: room.name.value,
      };
    });
  }

  @Post('room')
  async newRoom(@Body() data: NewRoomDTO): Promise<RoomDTO | void> {
    console.log(data);

    return Promise.resolve();
  }

  @EventPattern('chat:room:new-message')
  async onNewMessage(@Body() message: NewMessageDTO): Promise<void> {
    console.log(message);

    return Promise.resolve();
  }
}
