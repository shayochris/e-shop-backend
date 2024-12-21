import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsCategoriesService } from './products-categories.service';
import { CreateProductsCategoryDto } from './dto/create-products-category.dto';
import { UpdateProductsCategoryDto } from './dto/update-products-category.dto';
import { Public } from 'src/common/decorators/Public.decorator';

@Controller('products-categories')
export class ProductsCategoriesController {
  constructor(
    private readonly productsCategoriesService: ProductsCategoriesService,
  ) {}

  @Post()
  create(@Body() payload: CreateProductsCategoryDto) {
    return this.productsCategoriesService.create(payload);
  }

  @Public()
  @Get()
  findAll() {
    return this.productsCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductsCategoryDto) {
    return this.productsCategoriesService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCategoriesService.remove(+id);
  }
}
