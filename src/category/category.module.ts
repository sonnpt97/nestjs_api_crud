
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/sql/product/product.entity';
import { Category } from 'src/sql/category/category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category]), CategoryModule],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}