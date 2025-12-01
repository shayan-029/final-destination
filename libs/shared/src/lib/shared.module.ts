import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [DatabaseModule],
})
export class SharedModule {}
