import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
import { AuthService } from './app/auth.service';
import { EmailService } from './app/email.service';
import { SharedModule } from './../../../libs/shared/src/lib/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, PasswordReset, PasswordResetSchema } from '@shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class AppModule {}
