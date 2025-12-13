import Chat from "../components/Chat";

type Props = {
  params: Promise<{ roomId: string }>;
};

export default async function Page({ params }: Props) {
  const { roomId } = await params;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Chat roomId={roomId} />
    </div>
  );
}
