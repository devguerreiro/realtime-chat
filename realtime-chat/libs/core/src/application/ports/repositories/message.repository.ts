import type { RoomName } from '@lib/core/domain/value-objects/room-name';
import type { MessageContent } from '@lib/core/domain/value-objects/message-content';
import type { UserEntity } from '@lib/core/domain/entities/user.entity';

import {
  MessageEntity,
  RoomEntity,
} from '@lib/core/domain/entities/room.entity';

export interface MessageRepository {
  findByRoomName(roomName: RoomName): Promise<MessageEntity[]>;
  create(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity,
  ): Promise<MessageEntity>;
}
