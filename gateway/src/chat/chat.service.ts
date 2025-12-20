import { Inject, Injectable } from '@nestjs/common';

import { MessageCreatedEvent } from 'src/publisher/publisher.event';
import type { EventPublisher } from 'src/publisher/event-publisher.interface';

import { EVENT_PUBLISHER } from 'src/publisher/event-publisher.token';

import { NewMessageDTO } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher,
  ) {}

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
