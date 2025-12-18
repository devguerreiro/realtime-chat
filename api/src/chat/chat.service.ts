import { Injectable } from '@nestjs/common';

import { MessageMapper } from './chat.mapper';
import { ChatRepository } from './chat.repository';
import { MessageDTO } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(private repository: ChatRepository) {}

  async getMessagesByRoomId(roomId: string): Promise<MessageDTO[]> {
    const messages = await this.repository.getMessagesByRoomId(roomId);

    const mapper = new MessageMapper();

    return messages.map((message) => mapper.toMessageDTO(message));
  }
}
