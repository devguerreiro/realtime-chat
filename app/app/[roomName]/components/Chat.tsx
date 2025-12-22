"use client";

import { KeyboardEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  joinRoom,
  leaveRoom,
  offConnect,
  offJoinedRoom,
  offLeftRoom,
  offMessageBroadcast,
  onConnect,
  onJoinedRoom,
  onLeftRoom,
  onMessageBroadcast,
  sendMessage,
} from "@/services/web-socket.service";

import { RoomMessage } from "@/models/chat.model";

import ChatMessage from "./ChatMessage";

type Props = {
  roomName: string;
  roomMessages: RoomMessage[];
};

export default function Chat({ roomName, roomMessages }: Props) {
  const [hasLeft, setHasLeft] = useState<boolean>(false);
  const [messages, setMessages] = useState<RoomMessage[]>(roomMessages);

  function onLeave() {
    leaveRoom(roomName);

    console.log("You left the room.");

    setHasLeft(true);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;

      const message = input.value;
      if (message.trim()) {
        sendMessage({
          roomName,
          content: message,
        });
      }

      input.value = "";
    }
  }

  useEffect(() => {
    joinRoom(roomName);

    function onNewMessage(message: RoomMessage) {
      setMessages((messages) => [...messages, message]);
    }

    function onJoined(message: string) {
      console.log(message);
    }

    function onLeft(message: string) {
      console.log(message);
    }

    function onConnected() {
      joinRoom(roomName);
    }

    onMessageBroadcast(onNewMessage);
    onJoinedRoom(onJoined);
    onLeftRoom(onLeft);
    onConnect(onConnected);

    return () => {
      offMessageBroadcast(onNewMessage);
      offJoinedRoom(onJoined);
      offLeftRoom(onLeft);
      offConnect(onConnected);

      leaveRoom(roomName);
    };
  }, [roomName]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-96 h-80">
        <CardHeader>
          <CardTitle className="text-center uppercase">{roomName}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-1 overflow-y-scroll">
          {messages.map((message) => (
            <ChatMessage key={message.timestamp} message={message} />
          ))}
        </CardContent>
        <CardFooter>
          <Input autoFocus onKeyDown={onInputKeyDown} disabled={hasLeft} />
        </CardFooter>
      </Card>
      {!hasLeft && (
        <Button type="button" variant="destructive" onClick={onLeave}>
          Leave
        </Button>
      )}
    </div>
  );
}
