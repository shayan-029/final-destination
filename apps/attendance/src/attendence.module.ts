import { SharedModule } from '../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { AttendenceController } from './app/attendence.controller';
import { AttendenceService } from './app/attendence.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [AttendenceController],
  providers: [AttendenceService],
})
export class AttendenceModule {}
