import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const REDIS_MICROSERVICE_OPTIONS: MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
};
