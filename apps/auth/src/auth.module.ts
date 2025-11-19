import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { RmqModule } from '@shared/rmq.module';
import { MongodbModule } from '@shared/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '@shared/constants';
import { AuthService } from './app/auth.service';
import { SharedModule } from './../../../libs/shared/src/lib/shared.module';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
