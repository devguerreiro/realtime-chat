import { Injectable } from '@nestjs/common';

import { MessageCreatedEvent } from 'src/publisher/publisher.event';

import { NewMessageDTO } from './chat.dto';
import { PublisherService } from 'src/publisher/publisher.service';

@Injectable()
export class ChatService {
  constructor(private readonly publisher: PublisherService) {}

  validateNewMessage(message: NewMessageDTO) {
    const { content } = message;
    return !!content && content.length <= 500;
  }

  handleNewMessage(
    roomName: string,
    username: string,
    content: string,
    timestamp: number,
  ) {
    const event = new MessageCreatedEvent(
      roomName,
      username,
      content,
      timestamp,
    );

    this.publisher.publishMessageCreated(event);
  }
}
