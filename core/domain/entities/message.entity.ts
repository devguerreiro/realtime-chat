import type { MessageContent } from "../value-objects/message-content";

import { RoomEntity } from "./room.entity";
import { UserEntity } from "./user.entity";

export class MessageEntity {
  constructor(
    readonly content: MessageContent,
    readonly sentAt: number,
    readonly sender: UserEntity,
    readonly room: RoomEntity
  ) {}
}
