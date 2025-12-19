export interface MessageIn {
  roomName: string;
  content: string;
  timestamp: number;
}

export interface MessageOut {
  content: string;
  timestamp: number;
  username: string;
}
