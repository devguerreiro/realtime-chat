import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { MessageRepository } from '@lib/core/application/ports/repositories/message.repository';
import { MessageContent } from '@lib/core/domain/value-objects/message-content';
import { UserEntity } from '@lib/core/domain/entities/user.entity';
import {
  MessageEntity,
  RoomEntity,
} from '@lib/core/domain/entities/room.entity';
import { RoomName } from '@lib/core/domain/value-objects/room-name';

import { Message } from '@app/api/typeorm/entities/message.entity';
import { AppDataSource } from '@app/api/typeorm/data-source';
import { Room } from '@app/api/typeorm/entities/room.entity';
import { User } from '@app/api/typeorm/entities/user.entity';

@Injectable()
export class TypeORMMessageRepository implements MessageRepository {
  repository: Repository<Message>;

  constructor() {
    this.repository = AppDataSource.getRepository(Message);
  }

  async create(
    content: MessageContent,
    user: UserEntity,
    room: RoomEntity,
  ): Promise<MessageEntity> {
    const message = new Message();
    message.content = content.value;
    message.timestamp = Date.now();

    const _user = new User();
    _user.username = user.username.value;

    const _room = new Room();
    _room.name = room.name.value;

    message.user = _user;
    message.room = _room;

    await this.repository.save(message);

    return MessageEntity.create(
      message.content,
      message.timestamp,
      user.username.value,
    );
  }

  async findByRoomName(roomName: RoomName): Promise<MessageEntity[]> {
    const messages = await this.repository.find({
      where: {
        room: {
          name: roomName.value,
        },
      },
      relations: {
        user: true,
      },
    });
    return messages.map((message) =>
      MessageEntity.create(
        message.content,
        message.timestamp,
        message.user.username,
      ),
    );
  }
}
