import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MessageCreatedEvent } from './publisher.event';
import { PUBLISHER } from './publisher.token';

@Injectable()
export class PublisherService {
  constructor(@Inject(PUBLISHER) private readonly publisher: ClientProxy) {}

  publishMessageCreated(event: MessageCreatedEvent): void {
    this.publisher.emit('chat:room:new-message', event);
  }
}
