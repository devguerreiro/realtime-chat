import { RoomEntity } from "@/domain/entities/room.entity";

import type { RoomRepository } from "@/application/ports/repositories/room.repository";

export class FindRoomByNameUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(name: string): Promise<RoomEntity> {
    return await this.roomRepository.findByName(name);
  }
}
