export class RoomEntity {
  constructor(readonly id: number, readonly name: string) {
    this.validate();
  }

  validate() {
    if (this.id < 0) throw new Error("id must be positive");
    if (this.name.length === 0) throw new Error("name must not be empty");
  }
}
