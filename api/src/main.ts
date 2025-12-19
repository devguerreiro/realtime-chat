import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

import { REDIS_MICROSERVICE_OPTIONS } from './config';

import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(REDIS_MICROSERVICE_OPTIONS);

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 8080);

  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.warn(error);
  }
}

bootstrap();
