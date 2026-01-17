import type { RoomRepository } from '@lib/core/application/ports/repositories/room.repository';
import type { RoomName } from '@lib/core/domain/value-objects/room-name';

import { RoomEntity } from '@lib/core/domain/entities/room.entity';

export class FindRoomByNameUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(name: RoomName): Promise<RoomEntity | null> {
    return await this.roomRepository.findByName(name);
  }
}
