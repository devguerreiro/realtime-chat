import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

import { Message } from 'src/chat/message/message.entity';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private getKey(roomName: string) {
    return `messages:${roomName}`;
  }

  async getCachedMessages(roomName: string): Promise<Message[] | undefined> {
    const cached = await this.cacheManager.get<Message[]>(
      this.getKey(roomName),
    );

    if (cached) {
      console.debug('got cached messages');
    }

    return cached;
  }

  async cacheMessages(
    roomName: string,
    messages: Message[],
  ): Promise<Message[]> {
    const cached = await this.cacheManager.set(this.getKey(roomName), messages);

    console.debug('messages have been cached');

    return cached;
  }

  async appendMessage(roomName: string, message: Message): Promise<void> {
    const cached = await this.getCachedMessages(roomName);

    if (cached) {
      cached.push(message);

      console.debug('a new message was appended to cache');
    }
  }
}
