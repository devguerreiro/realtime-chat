import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './api.module';
import { AppDataSource } from './typeorm/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

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
