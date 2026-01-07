import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { AppDataSource } from '@/data-source';

import { Room } from './room.entity';

@Injectable()
export class RoomRepository {
  private readonly repository: Repository<Room>;

  constructor() {
    this.repository = AppDataSource.getRepository(Room);
  }

  getByName(name: string): Promise<Room | null> {
    return this.repository.findOneBy({ name });
  }

  getAll(): Promise<Room[]> {
    return this.repository.find();
  }

  create(name: string) {
    const room = new Room();

    room.name = name;

    return this.repository.save(room);
  }
}
