import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Message } from '@app/api/typeorm/entities/message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.room)
  messages: Relation<Message[]>;
}
