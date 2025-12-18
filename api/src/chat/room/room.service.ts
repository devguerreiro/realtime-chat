import { Injectable } from '@nestjs/common';

import { RoomRepository } from './room.repository';

import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  getRoomByName(name: string): Promise<Room | null> {
    return this.roomRepository.getRoomByName(name);
  }
}
