/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './app/gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const swaggerConfig = new DocumentBuilder().setTitle("tution-mangement").addBearerAuth().setVersion("1.0").build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: { persistAuthorization: true }
  })

  const port = 8000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
