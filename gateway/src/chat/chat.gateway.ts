import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClientProxy } from '@nestjs/microservices';

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

  constructor(@Inject('RedisService') private redisClient: ClientProxy) {}

  @SubscribeMessage('chat:room:new-message')
  newMessage(client: Socket, message: MessageIn) {
    const username = client.handshake.auth.username as string;

    if (!username) return;

    if (
      client.rooms.has(message.roomName) &&
      message.content &&
      message.content.length <= 500
    ) {
      this.server.to(message.roomName).emit('chat:room:new-message', {
        ...message,
        username: client.handshake.auth.username as string,
      });

      this.redisClient.emit('chat:room:new-message', {
        ...message,
        username,
      });

      console.debug(
        `${username} sent a new message to room ${message.roomName}`,
      );
    }
  }

  @SubscribeMessage('chat:room:join')
  async joinRoom(client: Socket, roomName: string) {
    const username = client.handshake.auth.username as string;

    if (!username) return;

    for (const room of client.rooms) {
      if (room !== client.id) {
        await client.leave(room);

        console.debug(`${username} left the room ${room}`);
      }
    }

    await client.join(roomName);

    console.debug(`${username} joined the room ${roomName}`);

    this.server
      .to(roomName)
      .emit(
        'chat:room:joined',
        `${username} has entered the room ${roomName}.`,
      );
  }

  @SubscribeMessage('chat:room:leave')
  async leaveRoom(client: Socket, roomName: string) {
    const username = client.handshake.auth.username as string;

    if (!username) return;

    await client.leave(roomName);

    console.debug(`${username} left the room ${roomName}`);

    this.server
      .to(roomName)
      .emit('chat:room:left', `${username} has left the room ${roomName}.`);
  }
}
