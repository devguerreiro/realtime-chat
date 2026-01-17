export class MessageCreatedEvent {
  constructor(
    public readonly roomName: string,
    public readonly username: string,
    public readonly content: string,
    public readonly timestamp: number,
  ) {}
}
