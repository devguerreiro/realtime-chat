import type { RoomRepository } from "@/application/ports/repositories/room.repository";
import type { RoomCacheService } from "@/application/services/room/cache.service";

import { RoomEntity } from "@/domain/entities/room.entity";

export class FindAllRoomsUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService
  ) {}

  async execute(): Promise<RoomEntity[]> {
    const rooms = this.roomCache.getRooms();

    if (rooms) return rooms;

    return await this.roomRepository.findAll();
  }
}
