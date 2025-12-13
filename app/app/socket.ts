"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export function sendMessage(message: string) {
  socket.emit("message:new", {
    content: message,
    timestamp: new Date().getTime(),
  });
}
