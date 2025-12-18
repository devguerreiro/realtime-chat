import { Injectable } from '@nestjs/common';

import { User } from 'src/user/user.entity';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';

import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async create(
    content: string,
    timestamp: number,
    room: Room,
    user: User,
  ): Promise<void> {
    return this.messageRepository.create({
      content,
      timestamp,
      room,
      user,
    });
  }

  getByRoomName(
    roomName: string,
    limit?: number,
    offset?: number,
  ): Promise<Message[]> {
    return this.messageRepository.getByRoomName(roomName, limit, offset);
  }
}
