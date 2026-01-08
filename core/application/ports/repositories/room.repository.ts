import { RoomEntity } from "../entities/room.entity";

export interface RoomRepository {
  findByName(name: string): Promise<RoomEntity>;
  findAll(): Promise<RoomEntity[]>;
  create(name: string): Promise<RoomEntity>;
}
