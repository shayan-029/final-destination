import { User, PasswordReset, PasswordResetDocument, ForgotPasswordDto, ResetPasswordDto } from '@shared';
import { SignupDto, SignInDto } from '@shared';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(PasswordReset.name) private passwordResetModel: Model<PasswordResetDocument>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUserByEmail = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (existingUserByEmail) {
      throw new RpcException({
        statusCode: 400,
        status: 'error',
        message: 'Email already registered',
      });
    }

    // Check if name already exists
    const existingUserByName = await this.userModel.findOne({ name: dto.name });
    if (existingUserByName) {
      throw new RpcException({
        statusCode: 400,
        status: 'error',
        message: 'Name already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user object
    const newUser = new this.userModel({
      ...dto,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
    });

    // Save to database
    const savedUser = await newUser.save();

    // Remove password from response
    const userObject = savedUser.toObject();
    delete userObject.password;

    // Return response (never return password)
    return {
      message: 'Signup successful',
      data: userObject,
    };
  }

  async signin(dto: SignInDto) {
    // Find user by email (case insensitive)
    const user = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (!user) {
      throw new RpcException({
        statusCode: 401,
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new RpcException({
        statusCode: 401,
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    // Remove password from user object
    const userObject = user.toObject();
    delete userObject.password;

    return {
      message: 'Signin successful',
      data: {
        user: userObject,
        token,
      },
    };
  }

  async validateUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new RpcException({
        statusCode: 401,
        status: 'error',
        message: 'User not found',
      });
    }

    // Remove password from user object
    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
  }

  async forgetPassword(dto: ForgotPasswordDto) {
    // Find user by email
    const user = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        message: 'If the email exists, a password reset link has been sent.',
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Delete any existing reset tokens for this user
    await this.passwordResetModel.deleteMany({ userId: user._id });

    // Create new password reset record
    const passwordReset = new this.passwordResetModel({
      userId: user._id,
      otp: resetToken,
      expiresAt,
    });
    
    try {
      const savedReset = await passwordReset.save();
      console.log('✅ Password reset token saved successfully:', {
        id: savedReset._id,
        userId: savedReset.userId,
        token: resetToken.substring(0, 20) + '...',
        fullToken: resetToken, // Full token for testing
        expiresAt: savedReset.expiresAt,
      });
    } catch (error) {
      console.error('❌ Error saving password reset token:', error);
      throw new RpcException({
        statusCode: 500,
        status: 'error',
        message: 'Failed to create reset token',
      });
    }

    // Send email with reset token
    await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'If the email exists, a password reset link has been sent.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Validate passwords match
    if (dto.newPassword !== dto.confirmPassword) {
      throw new RpcException({
        statusCode: 400,
        status: 'error',
        message: 'Passwords do not match',
      });
    }

    // Find user by email
    const user = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        status: 'error',
        message: 'User not found with this email',
      });
    }

    // Check if user has requested password reset (token exists and not expired)
    const passwordReset = await this.passwordResetModel.findOne({
      userId: user._id,
    });

    if (!passwordReset) {
      throw new RpcException({
        statusCode: 400,
        status: 'error',
        message: 'Please request a password reset first by using forget-password endpoint',
      });
    }

    // Check if token has expired
    if (new Date() > passwordReset.expiresAt) {
      // Delete expired token
      await this.passwordResetModel.deleteOne({ _id: passwordReset._id });
      throw new RpcException({
        statusCode: 400,
        status: 'error',
        message: 'Password reset request has expired. Please request a new one.',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Delete used reset token
    await this.passwordResetModel.deleteOne({ _id: passwordReset._id });

    console.log('✅ Password reset successful for user:', user.email);

    return {
      message: 'Password has been reset successfully',
    };
  }
}
