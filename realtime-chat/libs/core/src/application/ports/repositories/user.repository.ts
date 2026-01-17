import type { Username } from '@lib/core/domain/value-objects/username';

import { UserEntity } from '@lib/core/domain/entities/user.entity';

export interface UserRepository {
  findByUsername(username: Username): Promise<UserEntity>;
}
