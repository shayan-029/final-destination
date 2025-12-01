import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'dfas8df98sdfa98sdf89as8df98as' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}
