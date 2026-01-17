import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Message } from '@app/api/typeorm/entities/message.entity';
import { Room } from '@app/api/typeorm/entities/room.entity';
import { User } from '@app/api/typeorm/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Message, Room, User],
  synchronize: true,
});
