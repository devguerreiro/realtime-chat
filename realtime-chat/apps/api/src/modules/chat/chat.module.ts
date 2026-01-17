import { Module } from '@nestjs/common';

import { TypeORMRoomRepository } from '@app/api/typeorm/repositories/room.repository';

import { CacheService } from '@lib/cache/cache.service';

import { CACHE_SERVICE, ROOM_REPOSITORY } from '@app/api/tokens';

import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [
    {
      provide: ROOM_REPOSITORY,
      useClass: TypeORMRoomRepository,
    },
    {
      provide: CACHE_SERVICE,
      useClass: CacheService,
    },
  ],
})
export class ChatModule {}
