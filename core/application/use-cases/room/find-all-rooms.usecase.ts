import { RoomEntity } from "@/domain/entities/room.entity";

import type { RoomRepository } from "@/application/ports/repositories/room.repository";

export class FindAllRoomsUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(): Promise<RoomEntity[]> {
    return await this.roomRepository.findAll();
  }
}
