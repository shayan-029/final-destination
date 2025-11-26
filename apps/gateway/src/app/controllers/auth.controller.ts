import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  SignupDto,
  SignInDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  Public,
  CreateStudentDto,
} from '@shared';
import { GatewayService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly appService: GatewayService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signup(@Body() body: SignupDto) {
    return this.appService.signup(body);
  }

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'User signin' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signin(@Body() body: SignInDto) {
    return this.appService.signin(body);
  }

  @Public()
  @Post('forget-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent (if email exists)',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async forgetPassword(@Body() body: ForgotPasswordDto) {
    return this.appService.forgetPassword(body);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({
    status: 400,
    description: 'Invalid token or passwords do not match',
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.appService.resetPassword(body);
  }
}
