import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  content: string;

  @Column()
  timestamp: number;

  @Column('uuid')
  roomId: string;

  @Column('uuid')
  userId: string;
}
