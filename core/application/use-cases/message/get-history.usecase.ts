import { MessageEntity } from "@/domain/entities/message.entity";

import type { MessageRepository } from "@/application/ports/repositories/message.repository";
import type { RoomName } from "@/domain/value-objects/room-name";

export class GetHistoryUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(roomName: RoomName): Promise<MessageEntity[]> {
    return await this.messageRepository.findByRoomName(roomName);
  }
}
