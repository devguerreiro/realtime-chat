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

import { joinRoom, leaveRoom, sendMessage, socket } from "../socket";
import { Message } from "../types";

import ChatMessage from "./ChatMessage";

type Props = {
  roomName: string;
  historyMessages: Message[];
};

export default function Chat({ roomName, historyMessages }: Props) {
  const [hasLeft, setHasLeft] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(historyMessages);

  useEffect(() => {
    joinRoom(roomName);

    function onNewMessage(message: Message) {
      setMessages((messages) => [...messages, message]);
    }

    function onJoined(message: string) {
      console.log(message);
    }

    function onLeft(message: string) {
      console.log(message);
    }

    socket.on("chat:room:new-message:broadcast", onNewMessage);
    socket.on("chat:room:joined", onJoined);
    socket.on("chat:room:left", onLeft);

    return () => {
      socket.off("chat:room:new-message:broadcast", onNewMessage);
      socket.off("chat:room:joined", onJoined);
      socket.off("chat:room:left", onLeft);

      leaveRoom(roomName);
    };
  }, [roomName]);

  function onLeave() {
    leaveRoom(roomName);

    console.log("You left the room.");

    setHasLeft(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;

      const message = input.value;
      if (message.trim()) {
        sendMessage({
          roomName,
          content: message,
          timestamp: new Date().getTime(),
        });
      }

      input.value = "";
    }
  }

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
          <Input autoFocus onKeyDown={onKeyDown} disabled={hasLeft} />
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
