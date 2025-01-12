import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDTO } from './model/category.model';
import { CategoryParam, ProductParam } from 'src/product/model/product.model';

@Resolver()
export class CategoryResolver {
    constructor(private categoryService: CategoryService) { }

    @Query(() => [CategoryDTO])
    async getAllCategories(): Promise<CategoryDTO[]> {
        return this.categoryService.findAll();
    }

    @Query(() => CategoryDTO)
    async getCategoryById(@Args('id') id: number): Promise<CategoryDTO> {
      const category = await this.categoryService.getCategoryById(id);
      return category;
    }
    
    @Mutation(() => CategoryDTO)
    async createCategory(
        @Args('createCategoryInput') createCategoryInput: CategoryParam,
    ): Promise<CategoryDTO> {
        return this.categoryService.createCategory(createCategoryInput);
    }

    @Mutation(() => CategoryDTO)
    async updateCategory(
        @Args('id') id: number,
        @Args('updateCategoryInput') input: CategoryParam,
    ): Promise<CategoryDTO> {
        const updatedProduct = await this.categoryService.updateCategory(id, input);
        return updatedProduct;
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Args('id') id: number): Promise<boolean> {
        return this.categoryService.deleteCategory(id);
    }

}
