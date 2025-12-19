import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { NewMessageDTO } from './dto/new-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  private broadcastMessage(
    socket: Socket,
    roomName: string,
    username: string,
    content: string,
    timestamp: number,
  ) {
    socket.to(roomName).emit('chat:room:new-message:broadcast', {
      roomName,
      username,
      content,
      timestamp,
    });
  }

  @SubscribeMessage('chat:room:new-message')
  onNewMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: NewMessageDTO,
  ) {
    const username = socket.handshake.auth.username as string;

    if (!username) {
      console.error('there is no username');
      return;
    }

    const { roomName, content } = message;

    if (!socket.rooms.has(roomName)) {
      console.error('invalid room');
      return;
    }

    if (!this.chatService.validateNewMessage(message)) {
      console.error('invalid message');
      return;
    }

    const timestamp = new Date().getTime();

    this.broadcastMessage(socket, roomName, username, content, timestamp);

    console.debug(`${username} sent a new message to room ${message.roomName}`);

    this.chatService.handleNewMessage(
      roomName,
      username,
      message.content,
      timestamp,
    );
  }

  @SubscribeMessage('chat:room:join')
  async onJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    const username = socket.handshake.auth.username as string;

    if (!username) return;

    for (const room of socket.rooms) {
      await socket.leave(room);
    }

    await socket.join(roomName);

    console.debug(`${username} joined the room ${roomName}`);

    socket
      .to(roomName)
      .emit(
        'chat:room:joined',
        `${username} has entered the room ${roomName}.`,
      );
  }

  @SubscribeMessage('chat:room:leave')
  async onLeaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    const username = socket.handshake.auth.username as string;

    if (!username) return;

    await socket.leave(roomName);

    console.debug(`${username} left the room ${roomName}`);

    socket
      .to(roomName)
      .emit('chat:room:left', `${username} has left the room ${roomName}.`);
  }
}
