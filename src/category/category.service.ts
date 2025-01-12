import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryParam } from 'src/product/model/product.model';
import { Category } from 'src/sql/category/category.entity';
import { Products } from 'src/sql/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
    ) { }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });

        return category;
    }

    async createCategory(createCategoryInput: CategoryParam): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryInput);
        return this.categoryRepository.save(category);
    }

    async updateCategory(
        id: number,
        updateCategoryInput: CategoryParam,
    ): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        Object.assign(category, updateCategoryInput);
        return this.categoryRepository.save(category);
    }


    async deleteCategory(id: number): Promise<boolean> {
        await this.productRepository.delete({ categoryId: id });
        await this.categoryRepository.delete(id);

        return true;
    }


}

