import Chat from "../components/Chat";

import { Message } from "../types";

type Props = {
  params: Promise<{ roomName: string }>;
};

export default async function Page({ params }: Props) {
  const { roomName } = await params;

  const response = await fetch(
    `http://localhost:8080/chat/messages?roomName=${roomName}`
  );

  const messages = (await response.json()) as Message[];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Chat roomName={roomName} historyMessages={messages} />
    </div>
  );
}
