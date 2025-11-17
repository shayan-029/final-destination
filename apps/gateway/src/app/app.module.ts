import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.registerAsync(
      Object.values(SERVICES).map((service: any) => ({
        name: service,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RMQ_URI')],
            queue: config.get<string>(`RMQ_${service}_QUEUE`),
            queueOptions: { durable: false },
          },
        }),
      }))
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
