import { MessageCreatedEvent } from './events/message-created.event';

export interface EventPublisher {
  publishMessageCreated(event: MessageCreatedEvent): void;
}
