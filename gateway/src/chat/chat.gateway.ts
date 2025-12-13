import { WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  handleConnection(client: Socket) {
    client.emit('connected', 'New connection received');
  }
}
