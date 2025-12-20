import { Controller } from '@nestjs/common';
import { Body, HttpException, HttpStatus } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ListMessageDTO, NewMessageDTO } from '../../chat/chat.dto';

import { MessageService } from 'src/chat/message/message.service';
import { RoomService } from 'src/chat/room/room.service';
import { UserService } from 'src/user/user.service';
import { CacheService } from 'src/cache/cache.service';

@Controller()
export class MSChatController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}

  @EventPattern('chat:room:new-message')
  async onNewMessage(@Body() message: NewMessageDTO) {
    const room = await this.roomService.getRoomByName(message.roomName);

    if (room === null) {
      throw new HttpException('room does not exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getByUsername(message.username);

    if (user === null) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    const createdMessage = await this.messageService.create(
      message.content,
      message.timestamp,
      room,
      user,
    );

    await this.cacheService.appendMessage(
      message.roomName,
      new ListMessageDTO().fromEntity(createdMessage),
    );
  }
}
