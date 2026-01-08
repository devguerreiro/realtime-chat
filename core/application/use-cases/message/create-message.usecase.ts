import { MessageEntity } from "@/domain/entities/message.entity";
import { RoomEntity } from "@/domain/entities/room.entity";
import { UserEntity } from "@/domain/entities/user.entity";

import type { MessageRepository } from "@/application/ports/repositories/message.repository";

export class CreateMessageUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(
    content: string,
    user: UserEntity,
    room: RoomEntity
  ): Promise<MessageEntity> {
    return await this.messageRepository.create(content, user, room);
  }
}
