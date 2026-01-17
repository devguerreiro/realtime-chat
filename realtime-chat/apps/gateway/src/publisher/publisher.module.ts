import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PUBLISHER } from './publisher.token';
import { PublisherService } from './publisher.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PUBLISHER,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
