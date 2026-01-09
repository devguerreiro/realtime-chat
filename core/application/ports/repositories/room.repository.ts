import type { RoomName } from "@/domain/value-objects/room-name";
import type { MessageContent } from "@/domain/value-objects/message-content";
import type { UserEntity } from "@/domain/entities/user.entity";

import { MessageEntity, RoomEntity } from "@/domain/entities/room.entity";

export interface RoomRepository {
  findByName(name: RoomName): Promise<RoomEntity>;
  findAll(): Promise<RoomEntity[]>;
  create(name: RoomName): Promise<RoomEntity>;
  findMessages(roomName: RoomName): Promise<MessageEntity[]>;
  createMessage(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity
  ): Promise<MessageEntity>;
}
