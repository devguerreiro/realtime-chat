import { RoomMessage } from "../models/chat.model";

export async function getRoomMessages(roomName: string) {
  const response = await fetch(
    `http://localhost:8080/chat/messages?roomName=${roomName}`
  );

  if (response.ok) {
    return (await response.json()) as RoomMessage[];
  }

  return [];
}
