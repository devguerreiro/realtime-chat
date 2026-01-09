import type { RoomRepository } from "@/application/ports/repositories/room.repository";
import type { RoomName } from "@/domain/value-objects/room-name";
import type { RoomCacheService } from "@/application/services/room/cache.service";

import { RoomEntity } from "@/domain/entities/room.entity";

export class CreateRoomUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService
  ) {}

  async execute(name: RoomName): Promise<RoomEntity> {
    const room = await this.roomRepository.create(name);

    this.roomCache.saveRoom(room);

    return room;
  }
}
