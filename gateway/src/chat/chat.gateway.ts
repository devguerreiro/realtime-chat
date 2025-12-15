import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import type { MessageIn } from './chat.models';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message:new')
  handleNewMessage(client: Socket, message: MessageIn) {
    const userId = client.handshake.auth.userId as string;

    if (!userId) return;

    if (
      client.rooms.has(message.roomId) &&
      message.content &&
      message.content.length <= 500
    ) {
      this.server.to(message.roomId).emit('message:new', {
        ...message,
        userId: client.handshake.auth.userId as string,
      });

      console.debug(`${userId} sent a new message to room ${message.roomId}`);
    }
  }

  @SubscribeMessage('room:join')
  async handleJoinRoom(client: Socket, roomId: string) {
    const userId = client.handshake.auth.userId as string;

    if (!userId) return;

    for (const room of client.rooms) {
      if (room !== client.id) {
        await client.leave(room);

        console.debug(`${userId} left the room ${roomId}`);
      }
    }

    await client.join(roomId);

    console.debug(`${userId} joined the room ${roomId}`);

    this.server.to(roomId).emit('joined', `${userId} has entered the room.`);
  }

  @SubscribeMessage('room:leave')
  async handleLeaveRoom(client: Socket, roomId: string) {
    const userId = client.handshake.auth.userId as string;

    if (!userId) return;

    await client.leave(roomId);

    console.debug(`${userId} left the room ${roomId}`);

    this.server.to(roomId).emit('left', `${userId} has left the room.`);
  }
}
