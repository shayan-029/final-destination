import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, User } from '@shared';
import { RpcException } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup(dto: RegisterDto) {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists)
      throw new RpcException({
        status: 'error',
        message: 'Email already exists',
        code: 401,
      });

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashed,
    });

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user)
      throw new RpcException({
        status: false,
        message: 'Invalid credentials',
        code: 401,
      });

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match)
      throw new RpcException({
        status: false,
        message: 'Invalid credentials',
        code: 401,
      });

    // generate jwt token
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user,
      accessToken,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not found');
    const plainToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(plainToken, 10);

    user.resetToken = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `https://your-frontend.com/reset-password?token=${plainToken}`;

    return {
      message: 'Password reset link sent to your email',
      resetLink,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { token, newPassword, confirmPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Find user ONLY by expiry
    const user = await this.userModel.findOne({
      resetTokenExpiry: { $gt: new Date() }, // Not expired
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Compare hashed token
    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return {
      message: 'Password reset successful',
    };
  }
}
