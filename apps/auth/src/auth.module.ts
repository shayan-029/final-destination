import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { AuthService } from './app/auth.service';
import { SharedModule } from './../../../libs/shared/src/lib/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule, SERVICES, User, UserSchema } from '@shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: '30d' },
    }),
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AppModule {}
