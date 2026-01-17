import type { CacheService } from '@lib/core/application/ports/services/cache.service';
import type { RoomName } from '@lib/core/domain/value-objects/room-name';

import {
  MessageEntity,
  RoomEntity,
} from '@lib/core/domain/entities/room.entity';

export class RoomCacheService {
  constructor(private readonly cacheService: CacheService) {}

  private getRoomsKey(): string {
    return 'rooms';
  }

  private getMessagesKey(roomName: RoomName): string {
    return `rooms:${roomName.value}:messages`;
  }

  getRooms(): Promise<RoomEntity[] | null> {
    return this.cacheService.get<RoomEntity[]>(this.getRoomsKey());
  }

  getMessages(roomName: RoomName): Promise<MessageEntity[] | null> {
    return this.cacheService.get<MessageEntity[]>(
      this.getMessagesKey(roomName),
    );
  }

  async saveRoom(room: RoomEntity): Promise<void> {
    const rooms = await this.getRooms();

    if (rooms) {
      rooms.push(room);
    } else {
      await this.cacheService.set(this.getRoomsKey(), [room]);
    }
  }

  async saveMessage(roomName: RoomName, message: MessageEntity): Promise<void> {
    const messages = await this.getMessages(roomName);

    if (messages) {
      messages.push(message);
    } else {
      await this.cacheService.set(this.getMessagesKey(roomName), [message]);
    }
  }
}
