"use client";

import { io } from "socket.io-client";

import { Message } from "./types";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export function sendMessage(message: Message) {
  socket.emit("message:new", message);
}
