"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

export default function Page() {
  const [roomName, setRoomName] = useState("");

  const router = useRouter();

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      router.push(roomName);
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setRoomName(event.target.value);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xs flex flex-col gap-3">
        <Input
          placeholder="room's name"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      </div>
    </div>
  );
}
