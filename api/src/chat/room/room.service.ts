import { Injectable } from '@nestjs/common';

import { RoomRepository } from './room.repository';

import { Room } from './room.entity';
import { NewRoomDTO } from '../chat.dto';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  getRoomByName(name: string): Promise<Room | null> {
    return this.roomRepository.getRoomByName(name);
  }

  getAll(): Promise<Room[]> {
    return this.roomRepository.getAll();
  }

  createRoom(data: NewRoomDTO) {
    return this.roomRepository.createRoom(data.name.toUpperCase());
  }
}
