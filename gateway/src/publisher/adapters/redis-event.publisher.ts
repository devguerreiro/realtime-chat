import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MessageCreatedEvent } from '../events/message-created.event';
import { EventPublisher } from '../event-publisher.interface';

@Injectable()
export class RedisEventPublisher implements EventPublisher {
  constructor(@Inject('RedisService') private redisClient: ClientProxy) {}

  publishMessageCreated(event: MessageCreatedEvent): void {
    this.redisClient.emit('chat:room:new-message', event);
  }
}
