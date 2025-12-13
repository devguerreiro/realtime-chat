"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [roomName, setRoomName] = useState("");

  const router = useRouter();

  function handleOnJoin() {
    router.push(roomName);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xs flex flex-col gap-3">
        <Input
          placeholder="room's name"
          onChange={(event) => {
            setRoomName(event.target.value);
          }}
        />
        <Button type="button" onClick={handleOnJoin}>
          Join
        </Button>
      </div>
    </div>
  );
}
