import { MessageDTO } from './chat.dto';
import { Message } from './chat.entity';

export class MessageMapper {
  toMessageDTO(message: Message): MessageDTO {
    const messageDTO = new MessageDTO();

    messageDTO.content = message.content;
    messageDTO.timestamp = message.timestamp;
    messageDTO.userId = message.userId;

    return messageDTO;
  }
}
