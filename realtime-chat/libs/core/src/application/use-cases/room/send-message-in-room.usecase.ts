import type { MessageRepository } from '@lib/core/application/ports/repositories/message.repository';
import type { MessageContent } from '@lib/core/domain/value-objects/message-content';
import type { RoomCacheService } from '@lib/core/application/services/room/cache.service';

import {
  RoomEntity,
  MessageEntity,
} from '@lib/core/domain/entities/room.entity';
import { UserEntity } from '@lib/core/domain/entities/user.entity';

export class SendMessageInRoomUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomCache: RoomCacheService,
  ) {}

  async execute(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity,
  ): Promise<MessageEntity> {
    const message = await this.messageRepository.create(content, user, room);

    await this.roomCache.saveMessage(room.name, message);

    return message;
  }
}
