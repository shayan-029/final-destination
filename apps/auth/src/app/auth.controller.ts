import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDto, SignInDto, ForgotPasswordDto, ResetPasswordDto } from '@shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signup')
  async signup(@Payload() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @MessagePattern('signin')
  async signin(@Payload() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @MessagePattern('validate-user')
  async validateUser(@Payload() userId: string) {
    return this.authService.validateUser(userId);
  }

  @MessagePattern('forget-password')
  async forgetPassword(@Payload() dto: ForgotPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @MessagePattern('reset-password')
  async resetPassword(@Payload() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
