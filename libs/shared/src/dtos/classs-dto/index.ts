import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateClassSectionDto {
  @IsString()
  @ApiProperty({ example: 'Class 10', description: 'Class name' })
  className: string;

  @IsString()
  @ApiProperty({ example: 'A', description: 'Section name' })
  sectionName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Description of the class section', description: 'Class section description', required: false })
  description?: string;
}

export class UpdateClassSectionDto extends PartialType(CreateClassSectionDto) {}
