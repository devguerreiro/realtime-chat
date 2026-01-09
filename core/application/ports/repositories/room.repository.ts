import type { RoomName } from "@/domain/value-objects/room-name";

import { RoomEntity } from "@/domain/entities/room.entity";

export interface RoomRepository {
  findByName(name: RoomName): Promise<RoomEntity>;
  findAll(): Promise<RoomEntity[]>;
  create(name: RoomName): Promise<RoomEntity>;
}
