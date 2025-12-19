"use client";

import { io } from "socket.io-client";

import { NewMessage } from "./types";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  auth: {
    username: "devguerreiro",
  },
});

export function sendMessage(message: NewMessage) {
  socket.emit("chat:room:new-message", message);
}

export function joinRoom(roomId: string) {
  socket.emit("chat:room:join", roomId);
}

export function leaveRoom(roomId: string) {
  socket.emit("chat:room:leave", roomId);
}
