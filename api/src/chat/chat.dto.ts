import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class NewMessageDTO {
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsPositive()
  timestamp: number;
}

export class NewRoomDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ListMessageDTO {
  username: string;
  content: string;
  timestamp: number;
}

export class ListRoomDTO {
  name: string;
}

export class RoomDTO {
  name: string;
}
