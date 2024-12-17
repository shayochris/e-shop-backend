import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  old_password: string;

  @IsNotEmpty()
  @MinLength(5)
  new_password: string;
}
