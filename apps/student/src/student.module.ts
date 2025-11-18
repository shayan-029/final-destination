import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { RmqModule } from '@shared/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
