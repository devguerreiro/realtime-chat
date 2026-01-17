import type { MessageRepository } from '@lib/core/application/ports/repositories/message.repository';
import type { RoomCacheService } from '@lib/core/application/services/room/cache.service';
import type { RoomName } from '@lib/core/domain/value-objects/room-name';

import { MessageEntity } from '@lib/core/domain/entities/room.entity';

export class GetRoomMessagesUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomCache: RoomCacheService,
  ) {}

  async execute(roomName: RoomName): Promise<MessageEntity[]> {
    const messages = await this.roomCache.getMessages(roomName);

    if (messages) return messages;

    return await this.messageRepository.findByRoomName(roomName);
  }
}
