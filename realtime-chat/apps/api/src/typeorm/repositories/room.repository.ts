import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { RoomRepository } from '@lib/core/application/ports/repositories/room.repository';

import { RoomEntity } from '@lib/core/domain/entities/room.entity';
import { RoomName } from '@lib/core/domain/value-objects/room-name';

import { Room } from '@app/api/typeorm/entities/room.entity';

import { AppDataSource } from '@app/api/typeorm/data-source';

@Injectable()
export class TypeORMRoomRepository implements RoomRepository {
  repository: Repository<Room>;

  constructor() {
    this.repository = AppDataSource.getRepository(Room);
  }

  async findAll(): Promise<RoomEntity[]> {
    const rooms = await this.repository.find({
      relations: {
        messages: {
          user: true,
        },
      },
    });

    return rooms.map((room) => RoomEntity.create(room.name));
  }

  async create(name: RoomName): Promise<RoomEntity> {
    const room = new Room();
    room.name = name.value;

    await this.repository.save(room);

    return RoomEntity.create(room.name);
  }

  async findByName(name: RoomName): Promise<RoomEntity | null> {
    const room = await this.repository.findOneBy({ name: name.value });

    if (room) return RoomEntity.create(room.name);

    return null;
  }
}
