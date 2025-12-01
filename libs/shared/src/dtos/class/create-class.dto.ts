import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
 
export class CreateClassDto {
  @ApiProperty({ example: 'Class 10-A' })
  @IsNotEmpty()
  name: string;
 
  @ApiProperty({ example: '65d3d2f97bda23f9c2332ab1', required: false })
  @IsOptional()
  @IsMongoId()
  teacherId?: Types.ObjectId;
}
 
 
 