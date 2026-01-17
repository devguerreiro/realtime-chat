import { MessageContent } from '@lib/core/domain/value-objects/message-content';
import { RoomName } from '@lib/core/domain/value-objects/room-name';
import { Username } from '@lib/core/domain/value-objects/username';

import { UserEntity } from './user.entity';

export class RoomEntity {
  private constructor(private readonly _name: RoomName) {}

  get name(): RoomName {
    return this._name;
  }

  static create(name: string): RoomEntity {
    return new RoomEntity(RoomName.create(name));
  }
}

export class MessageEntity {
  private constructor(
    private readonly _content: MessageContent,
    private readonly _sentAt: number,
    private readonly _sender: UserEntity,
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

  static create(
    content: string,
    sentAt: number,
    sender: string,
  ): MessageEntity {
    const user = new UserEntity(Username.create(sender));
    return new MessageEntity(MessageContent.create(content), sentAt, user);
  }
}
