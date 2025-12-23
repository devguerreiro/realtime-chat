import { Room, RoomMessage } from "../models/chat.model";

export async function getRoomMessages(
  roomName: string
): Promise<RoomMessage[] | null> {
  const response = await fetch(
    `http://localhost:8080/chat/room/${roomName}/messages`
  );

  if (response.ok) {
    return (await response.json()) as RoomMessage[];
  }

  return null;
}

export async function getRooms(): Promise<Room[]> {
  const response = await fetch("http://localhost:8080/chat/room", {
    next: {
      tags: ["rooms"],
    },
  });

  if (response.ok) {
    return (await response.json()) as Room[];
  }

  return [];
}
