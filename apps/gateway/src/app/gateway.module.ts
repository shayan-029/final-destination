import { TeacherController } from './../../../teacher/src/app/teacher.controller';
import { SharedModule } from './../../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SERVICES } from '@shared/constants';
import { RmqModule } from '@shared/rmq.module';
import { AuthController } from './controllers/auth.controller';
import { StudentController } from './controllers/student.controller';
import { ClassController } from './controllers/class.controller';
import { JwtAuthGuard } from '@shared';
import { JwtStrategy } from '@shared';
import { GatewayService } from './services/auth.service';
import { GatewayStudentService } from './services/student.service';
import { GatewayClassService } from './services/class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './../../../../libs/shared/src/schemas/student.schema';
import { ClassSection, ClassSectionSchema } from './../../../../libs/shared/src/schemas/class.schema';
import { StudentService } from './../../../student/src/app/student.service';
import { TeacherService } from './../../../teacher/src/app/teacher.service';
import { ClassSectionService } from './../../../class/src/app/class.service';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: ClassSection.name, schema: ClassSectionSchema },
    ]),
  ],
  controllers: [
    AuthController,
    StudentController,
    ClassController,
    TeacherController,
  ],
  providers: [
    GatewayService,
    GatewayStudentService,
    GatewayClassService,
    StudentService,
    ClassSectionService,
    TeacherService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GatewayModule {}
