import { Repository } from 'typeorm';

import { AppDataSource } from 'src/data-source';

import { Message } from './chat.entity';

export class ChatRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = AppDataSource.getRepository(Message);
  }

  async newMessage(message: Message) {
    await this.repository.save(message);
  }

  getMessagesByRoomId(roomId: string) {
    return this.repository.findBy({ roomId });
  }
}
