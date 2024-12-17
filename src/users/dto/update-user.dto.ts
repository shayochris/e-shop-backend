import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  email: string;
}
