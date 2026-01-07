import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { AppDataSource } from '@/data-source';

import { Message } from './message.entity';

@Injectable()
export class MessageRepository {
  private readonly repository: Repository<Message>;

  constructor() {
    this.repository = AppDataSource.getRepository(Message);
  }

  async create(message: Omit<Message, 'id'>): Promise<Message> {
    return await this.repository.save(message);
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
      relations: {
        user: true,
      },
      take: limit ?? 20,
      skip: offset ?? 0,
    });
  }
}
