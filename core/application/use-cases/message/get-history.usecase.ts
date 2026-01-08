import { MessageEntity } from "@/domain/entities/message.entity";

import type { MessageRepository } from "@/application/ports/repositories/message.repository";

export class GetHistoryUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(roomName: string): Promise<MessageEntity[]> {
    return await this.messageRepository.findByRoomName(roomName);
  }
}
