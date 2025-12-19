import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { REDIS_MICROSERVICE_OPTIONS } from './config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(REDIS_MICROSERVICE_OPTIONS);

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 8081);
}

bootstrap();
