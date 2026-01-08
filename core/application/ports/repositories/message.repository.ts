import { MessageEntity } from "../entities/message.entity";
import { RoomEntity } from "../entities/room.entity";
import { UserEntity } from "../entities/user.entity";

export interface MessageRepository {
  findByRoomName(roomName: string): Promise<MessageEntity[]>;
  create(
    content: string,
    user: UserEntity,
    room: RoomEntity
  ): Promise<MessageEntity>;
}
