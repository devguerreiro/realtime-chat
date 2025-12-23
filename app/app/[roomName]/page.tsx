import { notFound } from "next/navigation";

import { getRoomMessages } from "@/services/chat.service";

import Chat from "./components/Chat";

type Props = {
  params: Promise<{ roomName: string }>;
};

export default async function Page({ params }: Props) {
  const { roomName } = await params;

  const messages = await getRoomMessages(roomName);

  if (messages === null) {
    notFound();
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Chat roomName={roomName} roomMessages={messages} />
    </div>
  );
}
