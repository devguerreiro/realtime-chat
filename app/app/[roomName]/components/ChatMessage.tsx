import { RoomMessage } from "@/models/chat.model";

type Props = {
  message: RoomMessage;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div className="w-full bg-background rounded p-2 space-y-1">
      <strong className="text-xs">{message.username}</strong>
      <div className="flex justify-between gap-8">
        <p className="text-xs font-medium wrap-break-word">{message.content}</p>
        <span className="shrink-0 text-[10px] font-light">
          {new Date(message.timestamp).toLocaleString("pt-br")}
        </span>
      </div>
    </div>
  );
}
