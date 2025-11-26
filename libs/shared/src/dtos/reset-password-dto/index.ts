import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email address of the user'
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ 
    example: 'newPassword123',
    description: 'New password (minimum 6 characters)'
  })
  newPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ 
    example: 'newPassword123',
    description: 'Confirm new password (must match newPassword)'
  })
  confirmPassword: string;
}
