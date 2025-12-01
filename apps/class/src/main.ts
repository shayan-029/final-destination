import { SERVICES } from './../../../libs/shared/src/constants/services';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './class.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI || 'amqp://localhost:5672'],
      queue: SERVICES.CLASS,
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
