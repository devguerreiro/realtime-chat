import { MessageCreatedEvent } from './publisher.event';

export interface EventPublisher {
  publishMessageCreated(event: MessageCreatedEvent): void;
}
