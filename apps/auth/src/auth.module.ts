import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
import { AuthService } from './app/auth.service';
import { SharedModule } from './../../../libs/shared/src/lib/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
