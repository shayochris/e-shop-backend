import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductsCategoryDto } from './dto/create-products-category.dto';
import { UpdateProductsCategoryDto } from './dto/update-products-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateProductsCategoryDto) {
    await this.validateCategoryName(payload.name);
    try {
      await this.prisma.productCategory.create({ data: { ...payload } });
      return { success: true, message: 'Product category added' };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.productCategory.findMany();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.productCategory.findUnique({
        where: { id },
      });
      if (!category) throw new NotFoundException('Category not found');
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, payload: UpdateProductsCategoryDto) {
    await this.findOne(id);
    await this.validateCategoryName(payload.name, id);
    await this.prisma.productCategory.update({
      where: { id },
      data: { ...payload },
    });
    return { success: true, message: 'category updated successfully' };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.productCategory.delete({ where: { id } });
    return { success: true, message: 'category removed' };
  }

  async validateCategoryName(name: string, excludedId?: number) {
    try {
      const name_taken = await this.prisma.productCategory.findFirst({
        where: { name, ...(excludedId && { id: { not: excludedId } }) },
      });
      if (name_taken) throw new ConflictException('name is already in use');
    } catch (error) {
      throw error;
    }
  }
}
