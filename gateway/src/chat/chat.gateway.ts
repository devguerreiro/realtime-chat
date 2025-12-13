import {
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
  handleNewMessage(client: Socket, message: Message) {
    console.debug('message received');

    if (
      client.rooms.has(message.roomId) &&
      message.content &&
      message.content.length <= 500
    ) {
      this.server.to(message.roomId).emit('message:new', message);

      console.debug(`message sent to room ${message.roomId}`);
    }
  }

  @SubscribeMessage('room:join')
  async handleJoinRoom(client: Socket, roomId: string) {
    for (const room of client.rooms) {
      if (room !== client.id) {
        await client.leave(room);

        console.debug(`left from room ${room}`);
      }
    }

    await client.join(roomId);

    console.debug(`joined the room ${roomId}`);

    this.server.to(roomId).emit('joined', `${client.id} has entered the room.`);
  }

  @SubscribeMessage('room:leave')
  async handleLeaveRoom(client: Socket, roomId: string) {
    await client.leave(roomId);

    console.debug(`left the room ${roomId}`);

    this.server.to(roomId).emit('left', `${client.id}  has left the room.`);
  }
}
