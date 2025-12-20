import { Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';

import { REDIS_MICROSERVICE_OPTIONS } from 'src/config';

import { PUBLISHER } from './publisher.token';
import { PublisherService } from './publisher.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PUBLISHER,
        ...(REDIS_MICROSERVICE_OPTIONS as ClientsModuleOptions),
      },
    ]),
  ],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
