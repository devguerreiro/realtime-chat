import { Injectable } from '@nestjs/common';

import { NewRoomDTO } from '@/dtos/chat.dto';

import { RoomRepository } from './room.repository';

import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  getByName(name: string): Promise<Room | null> {
    return this.roomRepository.getByName(name);
  }

  getAll(): Promise<Room[]> {
    return this.roomRepository.getAll();
  }

  create(data: NewRoomDTO) {
    return this.roomRepository.create(data.name.toUpperCase());
  }
}
