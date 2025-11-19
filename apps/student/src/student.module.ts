import { SharedModule } from './../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
