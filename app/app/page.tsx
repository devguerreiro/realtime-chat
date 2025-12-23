import { MessageSquareOffIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { getRooms } from "@/services/chat.service";

import RoomCard from "./components/RoomCard";
import AddRoomDialog from "./components/AddRoomDialog";

export default async function Page() {
  const rooms = await getRooms();

  return (
    <div className="container mx-auto pt-10 space-y-8">
      <div className="flex justify-end">
        <AddRoomDialog />
      </div>
      {rooms.length > 0 ? (
        <div className="grid grid-cols-12 *:col-span-4 gap-3">
          {rooms.map((room) => (
            <RoomCard key={room.name} room={room} />
          ))}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquareOffIcon />
            </EmptyMedia>
            <EmptyTitle>No rooms</EmptyTitle>
            <EmptyDescription>No rooms found</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <AddRoomDialog />
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
