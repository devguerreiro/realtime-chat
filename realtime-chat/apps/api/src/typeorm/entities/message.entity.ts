import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { Relation } from 'typeorm';

import { User } from '@app/api/typeorm/entities/user.entity';
import { Room } from '@app/api/typeorm/entities/room.entity';

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
