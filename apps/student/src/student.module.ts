import { SharedModule } from './../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../../../libs/shared/src/schemas/student.schema';
import { ClassSection, ClassSectionSchema } from '../../../libs/shared/src/schemas/class.schema';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: ClassSection.name, schema: ClassSectionSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
