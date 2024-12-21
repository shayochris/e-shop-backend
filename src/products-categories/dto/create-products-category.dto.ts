import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductsCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
