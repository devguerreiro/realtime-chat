import { MessageDTO, NewMessageDTO } from './chat.dto';
import { Message } from './chat.entity';

export class MessageMapper {
  toMessageDTO(message: Message): MessageDTO {
    const messageDTO = new MessageDTO();

    messageDTO.content = message.content;
    messageDTO.timestamp = message.timestamp;
    messageDTO.userId = message.userId;

    return messageDTO;
  }

  toEntity(message: NewMessageDTO): Message {
    const newMessage = new Message();

    newMessage.roomId = message.roomId;
    newMessage.content = message.content;
    newMessage.timestamp = message.timestamp;
    newMessage.userId = message.userId;

    return newMessage;
  }
}
