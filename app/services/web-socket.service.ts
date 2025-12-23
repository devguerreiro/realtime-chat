"use client";

import { io } from "socket.io-client";

import { NewMessageDTO } from "@/dtos/chat.dto";
import { RoomMessage } from "@/models/chat.model";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  auth: {
    username: "devguerreiro",
  },
  autoConnect: false,
});

export function connect(roomName: string) {
  socket.on("connect", () => {
    joinRoom(roomName);
  });

  socket.connect();
}

export function disconnect() {
  socket.removeAllListeners();
  socket.disconnect();
}

export function sendMessage(message: NewMessageDTO) {
  socket.emit("chat:room:new-message", message);
}

export function joinRoom(roomName: string) {
  socket.emit("chat:room:join", roomName);
}

export function leaveRoom(roomName: string) {
  socket.emit("chat:room:leave", roomName);
}

export function onMessageBroadcast(callback: (message: RoomMessage) => void) {
  socket.on("chat:room:new-message:broadcast", callback);
}

export function onJoinedRoom(callback: (message: string) => void) {
  socket.on("chat:room:joined", callback);
}

export function onLeftRoom(callback: (message: string) => void) {
  socket.on("chat:room:left", callback);
}
