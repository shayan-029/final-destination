/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { TeacherModule } from './teacher.module';

async function bootstrap() {
  const rmqUri = process.env.RMQ_URI || 'amqp://localhost:5672';
  const queue = SERVICES.STUDENT;

  try {
    const app = await NestFactory.createMicroservice(TeacherModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUri],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    });

    await app.listen();
    Logger.log(
      `🚀 Student Microservice is running and listening to queue: ${queue}`
    );
  } catch (error) {
    Logger.error(
      `Failed to start Student Microservice: ${error.message}`,
      'Bootstrap'
    );
    Logger.error(`Make sure RabbitMQ is running at ${rmqUri}`, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();
