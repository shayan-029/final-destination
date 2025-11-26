import { SharedModule } from '../../../libs/shared/src/lib/shared.module';
import { Module } from '@nestjs/common';
import { ClassController } from './app/class.controller';
import { ClassSectionService } from './app/class.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSection, ClassSectionSchema } from '../../../libs/shared/src/schemas/class.schema';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
    MongooseModule.forFeature([
      { name: ClassSection.name, schema: ClassSectionSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassSectionService],
})
export class ClassModule {}
