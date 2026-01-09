import type { RoomRepository } from "@/application/ports/repositories/room.repository";
import type { MessageContent } from "@/domain/value-objects/message-content";
import type { RoomCacheService } from "@/application/services/room/cache.service";

import { RoomEntity, MessageEntity } from "@/domain/entities/room.entity";
import { UserEntity } from "@/domain/entities/user.entity";

export class SendMessageInRoomUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService
  ) {}

  async execute(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity
  ): Promise<MessageEntity> {
    const message = await this.roomRepository.createMessage(
      content,
      user,
      room
    );

    this.roomCache.saveMessage(message);

    return message;
  }
}
