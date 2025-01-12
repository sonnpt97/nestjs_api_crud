import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/sql/category/category.entity';
import { Products } from 'src/sql/product/product.entity';
import { Repository } from 'typeorm';
import { ProductParam } from './model/product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(): Promise<Products[]> {
        return this.productRepository.find({ relations: ['category'] });
    }

    async getProductById(id: number): Promise<Products> {
        return await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    }

    async updateProduct(id: number, updateProductInput: ProductParam): Promise<Products> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
        Object.assign(product, updateProductInput);
        return this.productRepository.save(product);
    }

    async createProduct(createProductInput: ProductParam): Promise<Products> {
        const category = await this.categoryRepository.findOne({
            where: { id: createProductInput.categoryId },
        });
        const product = this.productRepository.create({
            ...createProductInput,
            category,
        });

        return this.productRepository.save(product);
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productRepository.delete(id);
        return result.affected > 0;
    }
}
