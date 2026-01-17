import type { Username } from '@lib/core/domain/value-objects/username';

export class UserEntity {
  constructor(private readonly _username: Username) {}

  get username(): Username {
    return this._username;
  }
}
