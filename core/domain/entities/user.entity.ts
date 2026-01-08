export class UserEntity {
  constructor(readonly id: number, readonly username: string) {
    this.validate();
  }

  validate() {
    if (this.id < 0) throw new Error("id must be positive");
    if (this.username.length === 0)
      throw new Error("username must not be empty");
  }
}
