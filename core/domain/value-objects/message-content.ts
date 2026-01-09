export class MessageContent {
  private constructor(readonly value: string) {}

  static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("message content must not be empty");
    }
    return new MessageContent(value);
  }
}
