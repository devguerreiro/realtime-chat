import { RoomEntity } from "./room.entity";
import { UserEntity } from "./user.entity";

export class MessageEntity {
  constructor(
    readonly id: number,
    readonly content: string,
    readonly timestamp: number,
    readonly user: UserEntity,
    readonly room: RoomEntity
  ) {
    this.validate();
  }

  validate() {
    if (this.id < 0) throw new Error("id must be positive");
    if (this.content.length === 0) throw new Error("content must not be empty");
  }
}
