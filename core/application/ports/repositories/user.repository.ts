import type { Username } from "@/domain/value-objects/username";

import { UserEntity } from "@/domain/entities/user.entity";

export interface UserRepository {
  findByUsername(username: Username): Promise<UserEntity>;
}
