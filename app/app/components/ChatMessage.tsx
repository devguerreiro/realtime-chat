import { Message } from "../types";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div className="bg-background rounded flex justify-between items-center p-2">
      <p className="font-medium">{message.content}</p>
      <span className="text-xs font-light">
        {new Date(message.timestamp).toLocaleString()}
      </span>
    </div>
  );
}
