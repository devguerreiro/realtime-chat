"use client";

import { io } from "socket.io-client";

import { NewMessage } from "./types";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  auth: {
    userId: crypto.randomUUID(),
  },
});

export function sendMessage(message: NewMessage) {
  socket.emit("message:new", message);
}
