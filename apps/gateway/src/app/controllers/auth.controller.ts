import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@shared';
import { AuthService } from '../services/auth.service';
 
@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly gatewayService: AuthService) {}
 
  @Post('signup')
  async signup(@Body() body: RegisterDto) {
    return this.gatewayService.signup(body);
  }
 
  @Post('sigin')
  async login(@Body() body: LoginDto) {
    return this.gatewayService.login(body);
  }
 
  @Post('forgot-password')
  async forgot(@Body() body: ForgotPasswordDto) {
    return this.gatewayService.forgot(body);
  }
 
  @Post('reset-password')
  async reset(@Body() body: ResetPasswordDto) {
    return this.gatewayService.reset(body);
  }
}