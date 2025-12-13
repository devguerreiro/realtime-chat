import { Message } from "../types";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div className="w-full bg-background rounded flex justify-between items-center gap-8 p-2">
      <p className="text-xs font-medium wrap-break-word">{message.content}</p>
      <span className="shrink-0 text-[10px] font-light">
        {new Date(message.timestamp).toLocaleString()}
      </span>
    </div>
  );
}
