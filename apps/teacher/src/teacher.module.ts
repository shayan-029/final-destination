import { SharedModule } from '../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { TeacherController } from './app/teacher.controller';
import { TeacherService } from './app/teacher.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
