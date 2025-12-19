import { Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';

import { REDIS_MICROSERVICE_OPTIONS } from 'src/config';

import { EVENT_PUBLISHER } from './event-publisher.token';

import { RedisEventPublisher } from './adapters/redis-event.publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RedisService',
        ...(REDIS_MICROSERVICE_OPTIONS as ClientsModuleOptions),
      },
    ]),
  ],
  providers: [
    {
      provide: EVENT_PUBLISHER,
      useClass: RedisEventPublisher,
    },
  ],
  exports: [EVENT_PUBLISHER],
})
export class PublisherModule {}
