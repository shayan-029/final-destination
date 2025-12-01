import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: '1661871629837892' })
  @IsOptional()
  @IsMongoId()
  classId?: string;

  @ApiProperty({ example: '2765176523' })
  @IsOptional()
  @IsArray()
  teacherSubjects?: string[];
}
