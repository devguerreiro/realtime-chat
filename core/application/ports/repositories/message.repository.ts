import type { MessageContent } from "@/domain/value-objects/message-content";
import type { RoomName } from "@/domain/value-objects/room-name";

import { MessageEntity } from "@/domain/entities/message.entity";
import { RoomEntity } from "@/domain/entities/room.entity";
import { UserEntity } from "@/domain/entities/user.entity";

export interface MessageRepository {
  findByRoomName(roomName: RoomName): Promise<MessageEntity[]>;
  create(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity
  ): Promise<MessageEntity>;
}
