import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class NewMessageDTO {
  @IsUUID()
  roomId: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsPositive()
  timestamp: number;
}

export class MessageDTO {
  content: string;
  timestamp: number;
  userId: string;
}
