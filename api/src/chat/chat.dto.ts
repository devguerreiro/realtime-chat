import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { PaginatedQuery } from 'src/base.dto';

import { Message } from './message/message.entity';

export class GetMessagesQuery extends PaginatedQuery {
  @IsString()
  @IsNotEmpty()
  roomName: string;
}

export class NewMessageDTO {
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsPositive()
  timestamp: number;
}

export class ListMessageDTO {
  content: string;
  timestamp: number;
  username: string;

  fromEntity(message: Message) {
    this.content = message.content;
    this.timestamp = message.timestamp;
    this.username = message.user.username;

    return this;
  }
}
