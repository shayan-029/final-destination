import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'password123' })
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({ example: 'student' })
  role: UserRole;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+91 9876543210' })
  phone?: string;
}


/////////////////////////////////////////////

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '1234' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
}
