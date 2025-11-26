import { IsEmail, IsNotEmpty, IsOptional, IsMongoId, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Student name' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'Student email' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'password123', description: 'Student password', minLength: 6 })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Computer Science', description: 'Course name' })
  course: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Class Section ID', 
    required: false 
  })
  classId?: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'Student name', required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'Student email', required: false })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @ApiProperty({ example: 'newPassword123', description: 'Student password', required: false, minLength: 6 })
  password?: string;

  @IsOptional()
  @ApiProperty({ example: 'Computer Science', description: 'Course name', required: false })
  course?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Class Section ID', 
    required: false 
  })
  classId?: string;
}
