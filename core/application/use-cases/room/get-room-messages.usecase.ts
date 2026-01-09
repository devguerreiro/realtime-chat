import type { RoomName } from "@/domain/value-objects/room-name";
import type { RoomRepository } from "@/application/ports/repositories/room.repository";
import type { RoomCacheService } from "@/application/services/room/cache.service";

import { MessageEntity } from "@/domain/entities/room.entity";

export class GetRoomMessagesUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService
  ) {}

  async execute(roomName: RoomName): Promise<MessageEntity[]> {
    const messages = this.roomCache.getMessages(roomName);

    if (messages) return messages;

    return await this.roomRepository.findMessages(roomName);
  }
}
