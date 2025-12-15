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

import { sendMessage, socket } from "../socket";
import { Message } from "../types";

import ChatMessage from "./ChatMessage";

type Props = {
  roomId: string;
};

export default function Chat({ roomId }: Props) {
  const [hasLeft, setHasLeft] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("room:join", roomId);

    function onNewMessage(message: Message) {
      setMessages((messages) => [...messages, message]);
    }

    function onJoined(message: string) {
      alert(message);
    }

    function onLeft(message: string) {
      alert(message);
    }

    socket.on("message:new", onNewMessage);
    socket.on("joined", onJoined);
    socket.on("left", onLeft);

    return () => {
      socket.off("message:new", onNewMessage);
      socket.off("joined", onJoined);
      socket.off("left", onLeft);

      socket.emit("room:leave", roomId);
    };
  }, [roomId]);

  function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const message = input.value;
      if (message.trim()) {
        sendMessage({
          roomId,
          content: message,
          timestamp: new Date().getTime(),
        });
      }
      input.value = "";
    }
  }

  function handleOnLeave() {
    socket.emit("room:leave", roomId);

    alert("You left the room.");

    setHasLeft(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-96 h-80">
        <CardHeader>
          <CardTitle className="text-center uppercase">{roomId}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-1 overflow-y-scroll">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </CardContent>
        <CardFooter>
          <Input autoFocus onKeyDown={handleOnKeyDown} disabled={hasLeft} />
        </CardFooter>
      </Card>
      {!hasLeft && (
        <Button type="button" variant="destructive" onClick={handleOnLeave}>
          Leave
        </Button>
      )}
    </div>
  );
}
