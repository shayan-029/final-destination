import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Student name' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'Student email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Computer Science', description: 'Course name' })
  course: string;
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
  @ApiProperty({ example: 'Computer Science', description: 'Course name', required: false })
  course?: string;
}
