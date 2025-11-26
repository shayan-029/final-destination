/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI || 'amqp://localhost:5672'],
      queue: SERVICES.AUTH,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  Logger.log(
    `🚀 Auth Microservice is running and listening to queue: ${process.env.RMQ_AUTH_QUEUE}`
  );
}

bootstrap();
