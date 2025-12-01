import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './controllers/auth.controller';
import { AuthStrategy, RmqModule, RoleBaseGuardsGuard, SERVICES, SharedModule, } from '@shared';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: '30d' },
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.STUDENT,
      SERVICES.CLASS,
    ]),
  ],
  controllers: [
    AuthController,
    ClassController,
  ],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    AuthService,
    ClassService,
  ],
})
export class GatewayModule {}
