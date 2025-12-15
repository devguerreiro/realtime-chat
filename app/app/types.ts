export interface NewMessage {
  roomId: string;
  content: string;
  timestamp: number;
}

export interface Message {
  roomId: string;
  content: string;
  timestamp: number;
  userId: string;
}
