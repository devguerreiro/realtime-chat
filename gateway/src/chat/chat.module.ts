import { Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';

import { REDIS_MICROSERVICE_OPTIONS } from 'src/config';

import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RedisService',
        ...(REDIS_MICROSERVICE_OPTIONS as ClientsModuleOptions),
      },
    ]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
