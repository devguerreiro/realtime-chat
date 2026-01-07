import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Message } from '@/domains/message/message.entity';
import { Room } from '@/domains/room/room.entity';
import { User } from '@/domains/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Message, Room, User],
  synchronize: true,
});
