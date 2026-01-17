import type { RoomRepository } from '@lib/core/application/ports/repositories/room.repository';
import type { RoomCacheService } from '@lib/core/application/services/room/cache.service';

import { RoomEntity } from '@lib/core/domain/entities/room.entity';

export class FindAllRoomsUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService,
  ) {}

  async execute(): Promise<RoomEntity[]> {
    const rooms = await this.roomCache.getRooms();

    if (rooms) return rooms;

    return await this.roomRepository.findAll();
  }
}
