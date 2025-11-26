import { SharedModule } from '../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { ClassController } from './app/class.controller';
import { ClassService } from './app/class.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
