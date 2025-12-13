import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import type { Message } from './chat.models';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message:new')
  handleNewMessage(@MessageBody() message: Message) {
    console.debug('message received');

    if (message.content && message.content.length <= 500) {
      this.server.emit('message:new', message);

      console.debug('message broadcasted');
    }
  }

  @SubscribeMessage('room:join')
  async handleJoinRoom(client: Socket, roomId: string) {
    for (const room of client.rooms) {
      await client.leave(room);
    }

    await client.join(roomId);

    this.server.to(roomId).emit('join', 'Someone has entered the room.');
  }

  @SubscribeMessage('room:leave')
  async handleLeaveRoom(client: Socket, roomId: string) {
    await client.leave(roomId);
  }
}
