import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsCategoriesModule } from './products-categories/products-categories.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsCategoriesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
