import { Injectable } from '@nestjs/common';

import { User } from 'src/user/user.entity';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';

import { MessageRepository } from './message.repository';

import { CacheService } from 'src/cache/cache.service';

import { ListMessageDTO } from '../chat.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(
    content: string,
    timestamp: number,
    room: Room,
    user: User,
  ): Promise<Message> {
    const created = await this.messageRepository.create({
      content,
      timestamp,
      room,
      user,
    });

    console.debug(
      `a new message from ${user.username} was saved in the database`,
    );

    return created;
  }

  async getByRoomName(
    roomName: string,
    limit?: number,
    offset?: number,
  ): Promise<ListMessageDTO[]> {
    const cached = await this.cacheService.getCachedMessages(roomName);

    if (cached) return cached;

    const messages = await this.messageRepository.getByRoomName(
      roomName,
      limit,
      offset,
    );

    console.debug(`got ${messages.length} messages`);

    const mappedMessages = messages.map((message) => {
      const mapper = new ListMessageDTO();
      return mapper.fromEntity(message);
    });

    await this.cacheService.cacheMessages(roomName, mappedMessages);

    return mappedMessages;
  }
}
