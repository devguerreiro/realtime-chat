import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { Relation } from 'typeorm';

import { User } from '@/domains/user/user.entity';
import { Room } from '@/domains/room/room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @Column()
  timestamp: number;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Relation<Room>;

  @ManyToOne(() => User)
  user: Relation<User>;
}
