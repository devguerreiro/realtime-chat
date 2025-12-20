import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { AppDataSource } from 'src/data-source';

import { Room } from './room.entity';

@Injectable()
export class RoomRepository {
  private readonly repository: Repository<Room>;

  constructor() {
    this.repository = AppDataSource.getRepository(Room);
  }

  getRoomByName(name: string): Promise<Room | null> {
    return this.repository.findOneBy({ name });
  }
}
