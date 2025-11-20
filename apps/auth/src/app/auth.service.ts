import { User } from '@shared';
import { SignupDto, SignInDto } from '@shared';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

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
}
