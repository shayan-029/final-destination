import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@shared';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async register(@Payload() dto: RegisterDto) {
    try {
      this.logger.log(`Signup request received for email: ${dto.email}`);
      return await this.authService.signup(dto);
    } catch (error) {
      this.logger.error(`Signup error: ${error.message}`, error.stack);
      throw error;
    }
  }

  @MessagePattern('auth.login')
  async login(@Payload() dto: LoginDto) {
    try {
      this.logger.log(`Login request received for email: ${dto.email}`);
      return await this.authService.login(dto);
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`, error.stack);
      throw error;
    }
  }

  @MessagePattern('auth.forgot')
  async forgot(@Payload() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @MessagePattern('auth.reset')
  async reset(@Payload() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
