import { Module } from '@nestjs/common';

import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '@shared/constants';
import { RmqModule } from '@shared/rmq.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,

    ]),

  ],
  controllers: [AuthController],
  providers: [GatewayService],
})
export class GatewayModule {}
