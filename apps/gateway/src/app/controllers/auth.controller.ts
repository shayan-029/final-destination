import { Body, Controller, Post } from '@nestjs/common';
import { GatewayService } from '../gateway.service';
import { SignupDto, SignInDto, Public } from '@shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: GatewayService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.appService.signup(body);
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return this.appService.signin(body);
  }
}
