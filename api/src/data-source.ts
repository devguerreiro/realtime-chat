import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Message } from './chat/chat.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Message],
  synchronize: true,
});
