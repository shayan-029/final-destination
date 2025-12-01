import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  SERVICES,
} from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {}

  async signup(body: RegisterDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.signup', body)
      );
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        status: 'error',
        message:
          error?.message || error?.response?.message || 'Internal server error',
        statusCode: error?.status || error?.statusCode || 500,
      };
    }
  }

  async login(body: LoginDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.login', body)
      );
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message:
          error?.message || error?.response?.message || 'Internal server error',
        statusCode: error?.status || error?.statusCode || 500,
      };
    }
  }

  async forgot(body: ForgotPasswordDto) {
    try {
      return await firstValueFrom(this.authClient.send('auth.forgot', body));
    } catch (error) {
      return {
        status: 'error',
        message: error?.message || 'Failed',
        statusCode: error?.statusCode || 500,
      };
    }
  }

  async reset(body: ResetPasswordDto) {
    try {
      return await firstValueFrom(this.authClient.send('auth.reset', body));
    } catch (error) {
      return {
        status: 'error',
        message: error?.message || 'Failed',
        statusCode: error?.statusCode || 500,
      };
    }
  }
}
