import { IsEmail, IsNotEmpty, IsOptional, IsMongoId, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Student name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Computer Science', description: 'Course name' })
  course: string;

  @IsMongoId()
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Class Section ID', 
    required: true 
  })
  classId?: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
