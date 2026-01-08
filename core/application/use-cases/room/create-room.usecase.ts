import { RoomEntity } from "@/domain/entities/room.entity";

import type { RoomRepository } from "@/application/ports/repositories/room.repository";

export class CreateRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(name: string): Promise<RoomEntity> {
    return await this.roomRepository.create(name);
  }
}
