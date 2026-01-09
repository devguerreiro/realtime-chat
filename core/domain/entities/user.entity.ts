import type { Username } from "../value-objects/username";

export class UserEntity {
  constructor(readonly username: Username) {}
}
