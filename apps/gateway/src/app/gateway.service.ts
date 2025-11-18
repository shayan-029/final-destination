import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class GatewayService {
  constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {}

  async signup(body) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('signup', body)
      );
      console.log('GATEWAY RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY ERROR >>>', error);
      return {
        status: 'error',
        message: error.message || 'Internal server error',
      };
    }
  }
}
