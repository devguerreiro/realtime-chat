import type { RoomName } from '@lib/core/domain/value-objects/room-name';

import { RoomEntity } from '@lib/core/domain/entities/room.entity';

export interface RoomRepository {
  findByName(name: RoomName): Promise<RoomEntity | null>;
  findAll(): Promise<RoomEntity[]>;
  create(name: RoomName): Promise<RoomEntity>;
}
