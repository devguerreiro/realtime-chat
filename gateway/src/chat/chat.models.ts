export interface MessageIn {
  roomId: string;
  content: string;
  timestamp: number;
}

export interface MessageOut {
  roomId: string;
  content: string;
  timestamp: number;
  userId: string;
}
