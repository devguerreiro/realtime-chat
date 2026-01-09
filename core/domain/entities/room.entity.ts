import type { RoomName } from "../value-objects/room-name";
import type { MessageContent } from "../value-objects/message-content";
import type { UserEntity } from "./user.entity";

export class RoomEntity {
  constructor(
    private readonly _name: RoomName,
    private readonly _messages: MessageEntity[]
  ) {}

  get name(): RoomName {
    return this._name;
  }

  get messages(): MessageEntity[] {
    return this._messages;
  }
}

export class MessageEntity {
  constructor(
    private readonly _content: MessageContent,
    private readonly _sentAt: number,
    private readonly _sender: UserEntity,
    private readonly _room: RoomEntity
  ) {}

  get content(): MessageContent {
    return this._content;
  }

  get sentAt(): number {
    return this._sentAt;
  }

  get sender(): UserEntity {
    return this._sender;
  }

  get room(): RoomEntity {
    return this._room;
  }
}
