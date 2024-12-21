import { Module } from '@nestjs/common';
import { ProductsCategoriesService } from './products-categories.service';
import { ProductsCategoriesController } from './products-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsCategoriesController],
  providers: [ProductsCategoriesService, PrismaService],
})
export class ProductsCategoriesModule {}
