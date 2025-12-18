import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Message } from './chat/message/message.entity';
import { Room } from './chat/room/room.entity';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Message, Room, User],
  synchronize: true,
});
