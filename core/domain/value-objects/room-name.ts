export class RoomName {
  private constructor(readonly value: string) {}

  static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("room name must not be empty");
    }
    return new RoomName(value);
  }
}
