import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';

@Module({
  imports: [MongodbModule],
  exports: [MongodbModule],
})
export class SharedModule {}
