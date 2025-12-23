"use server";

import { revalidateTag } from "next/cache";

export async function newRoom(roomName: string) {
  const response = await fetch("http://localhost:8080/chat/room", {
    method: "POST",
    body: JSON.stringify({
      name: roomName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("rooms", {
      expire: 0,
    });

    return { error: false };
  } else {
    const { message } = await response.json();

    return { error: true, message };
  }
}
