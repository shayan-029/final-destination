import { TeacherController } from './../../../teacher/src/app/teacher.controller';
import { SharedModule } from './../../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SERVICES } from '@shared/constants';
import { RmqModule } from '@shared/rmq.module';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { StudentController } from './controllers/student.controller';
import { JwtAuthGuard } from '@shared';
import { JwtStrategy } from '@shared';
import { GatewayService } from './services/auth.service';
import { GatewayStudentService } from './services/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './../../../../libs/shared/src/schemas/student.schema';
import { StudentService } from './../../../student/src/app/student.service';
import { TeacherService } from './../../../teacher/src/app/teacher.service';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [
    AuthController,
    ProfileController,
    StudentController,
    TeacherController,
  ],
  providers: [
    GatewayService,
    GatewayStudentService,
    StudentService,
    TeacherService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GatewayModule {}
