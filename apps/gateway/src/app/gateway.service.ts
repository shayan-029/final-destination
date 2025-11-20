import { SignupDto, SignInDto } from '@shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class GatewayService {
  constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {}

  async signup(body: SignupDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('signup', body)
      );
      console.log('GATEWAY RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY ERROR >>>', error);
      // Extract error message from RpcException or other NestJS exceptions
      if (error?.message?.message) {
        // RpcException format
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
          errors: error.message.errors || undefined,
        };
      }
      const errorMessage = error?.response?.message || error?.message || 'Internal server error';
      return {
        statusCode: 500,
        status: 'error',
        message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      };
    }
  }

  async signin(body: SignInDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('signin', body)
      );
      console.log('GATEWAY SIGNIN RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY SIGNIN ERROR >>>', error);
      // Extract error message from RpcException or other NestJS exceptions
      if (error?.message?.message) {
        // RpcException format
        return {
          statusCode: error.message.statusCode || 500,
          status: error.message.status || 'error',
          message: error.message.message,
          errors: error.message.errors || undefined,
        };
      }
      const errorMessage = error?.response?.message || error?.message || 'Internal server error';
      return {
        statusCode: 500,
        status: 'error',
        message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      };
    }
  }

  async validateUser(userId: string) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('validate-user', userId)
      );
      return result;
    } catch (error) {
      console.error('GATEWAY VALIDATE USER ERROR >>>', error);
      if (error?.message?.message) {
        return {
          statusCode: error.message.statusCode || 401,
          status: error.message.status || 'error',
          message: error.message.message,
        };
      }
      return {
        statusCode: 401,
        status: 'error',
        message: 'Unauthorized',
      };
    }
  }
}
