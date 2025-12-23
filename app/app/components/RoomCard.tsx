"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Room } from "@/models/chat.model";
import { useRouter } from "next/navigation";

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  const router = useRouter();

  function joinRoom() {
    router.push(room.name);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant={"secondary"} onClick={joinRoom}>
          Join room
        </Button>
      </CardFooter>
    </Card>
  );
}
