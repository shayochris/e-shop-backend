import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductsCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
