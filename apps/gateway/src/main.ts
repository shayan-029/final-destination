import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { GatewayModule } from './app/gateway.module';
 
async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      forbidNonWhitelisted: false,
      transform: true,          
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
 
  app.enableCors({
    origin: '*',
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Attendance Management System')
    .setDescription('API documentation for the Attendance Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
 
bootstrap();