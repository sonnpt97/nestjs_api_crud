
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Products } from 'src/sql/product/product.entity';
import { Category } from 'src/sql/category/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category]), CategoryModule],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}