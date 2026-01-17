import type { RoomRepository } from '@lib/core/application/ports/repositories/room.repository';
import type { RoomCacheService } from '@lib/core/application/services/room/cache.service';
import type { RoomName } from '@lib/core/domain/value-objects/room-name';

import { RoomEntity } from '@lib/core/domain/entities/room.entity';

export class CreateRoomUseCase {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomCache: RoomCacheService,
  ) {}

  async execute(name: RoomName): Promise<RoomEntity> {
    const room = await this.roomRepository.create(name);

    await this.roomCache.saveRoom(room);

    return room;
  }
}
