import { RoomEntity } from "@/domain/entities/room.entity";

import type { RoomRepository } from "@/application/ports/repositories/room.repository";
import type { RoomName } from "@/domain/value-objects/room-name";

export class FindRoomByNameUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(name: RoomName): Promise<RoomEntity> {
    return await this.roomRepository.findByName(name);
  }
}
