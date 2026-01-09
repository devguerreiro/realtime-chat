import type { CacheService } from "@/application/ports/services/cache.service";
import type { RoomName } from "@/domain/value-objects/room-name";

import { MessageEntity, RoomEntity } from "@/domain/entities/room.entity";

export class RoomCacheService {
  constructor(private readonly cacheService: CacheService) {}

  private getRoomsKey(): string {
    return "rooms";
  }

  private getMessagesKey(roomName: RoomName): string {
    return `rooms:${roomName}:messages`;
  }

  getRooms(): RoomEntity[] | null {
    return this.cacheService.get<RoomEntity[]>(this.getRoomsKey());
  }

  getMessages(roomName: RoomName): MessageEntity[] | null {
    return this.cacheService.get<MessageEntity[]>(
      this.getMessagesKey(roomName)
    );
  }

  saveRoom(room: RoomEntity): void {
    const rooms = this.getRooms();

    if (rooms) {
      rooms.push(room);
    } else {
      this.cacheService.set(this.getRoomsKey(), [room]);
    }
  }

  saveMessage(message: MessageEntity): void {
    const { name: roomName } = message.room;

    const messages = this.getMessages(roomName);

    if (messages) {
      messages.push(message);
    } else {
      this.cacheService.set(this.getMessagesKey(roomName), [message]);
    }
  }
}
