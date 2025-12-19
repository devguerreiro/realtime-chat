export interface NewMessage {
  roomName: string;
  content: string;
  timestamp: number;
}

export interface Message {
  content: string;
  timestamp: number;
  username: string;
}
