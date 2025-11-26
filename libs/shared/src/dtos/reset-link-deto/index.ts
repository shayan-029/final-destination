import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email address of the user who forgot their password'
  })
  email: string;
}
