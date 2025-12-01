import { Module } from '@nestjs/common';
import { SharedModule } from '../../../libs/shared/src/lib/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema, RmqModule, SERVICES } from '@shared';
import { ClassController } from './app/class.controller';
import { ClassService } from './app/class.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),

    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.CLASS]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class AppModule {}
