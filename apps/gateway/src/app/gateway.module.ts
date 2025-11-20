import { SharedModule } from './../../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '@shared/constants';
import { RmqModule } from '@shared/rmq.module';
import { MongodbModule } from '@shared/mongodb.module';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { JwtAuthGuard } from '@shared';
import { JwtStrategy } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
    ]),
  ],
  controllers: [AuthController, ProfileController],
  providers: [
    GatewayService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GatewayModule {}
