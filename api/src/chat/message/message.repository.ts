import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { AppDataSource } from 'src/data-source';

import { Message } from './message.entity';

@Injectable()
export class MessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = AppDataSource.getRepository(Message);
  }

  async create(message: Omit<Message, 'id'>): Promise<void> {
    await this.repository.save(message);
  }

  getByRoomName(
    roomName: string,
    limit?: number,
    offset?: number,
  ): Promise<Message[]> {
    return this.repository.find({
      where: {
        room: {
          name: roomName,
        },
      },
      take: limit ?? 20,
      skip: offset ?? 0,
    });
  }
}
