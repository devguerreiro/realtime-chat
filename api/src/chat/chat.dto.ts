export class NewMessageDTO {
  roomId: string;
  userId: string;
  content: string;
  timestamp: number;
}

export class MessageDTO {
  content: string;
  timestamp: number;
  userId: string;
}
