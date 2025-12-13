"use client";

import { KeyboardEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { sendMessage, socket } from "../socket";
import { Message } from "../types";

import ChatMessage from "./ChatMessage";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function onNewMessage(message: Message) {
      setMessages((messages) => [...messages, message]);
    }

    socket.on("message:new", onNewMessage);

    return () => {
      socket.off("message:new", onNewMessage);
    };
  }, []);

  function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const message = input.value;
      if (message.trim()) {
        sendMessage(message);
      }
      input.value = "";
    }
  }

  return (
    <Card className="w-1/2 h-80 flex flex-col gap-3">
      <CardContent className="flex-1 space-y-1 overflow-y-scroll">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </CardContent>
      <CardFooter>
        <Input autoFocus onKeyDown={handleOnKeyDown} />
      </CardFooter>
    </Card>
  );
}
