import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    MongodbModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtAuthGuard],
  exports: [MongodbModule, JwtModule, PassportModule, JwtAuthGuard],
})
export class SharedModule {}
