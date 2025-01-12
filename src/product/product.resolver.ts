import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductDTO, ProductParam } from './model/product.model';
import { Product } from 'src/schemas/product.schema';
import { ProductService } from './product.service';
import { Products } from 'src/sql/product/product.entity';

@Resolver()
export class ProductResolver {
  constructor(readonly productService: ProductService) {}

  @Query(() => [ProductDTO])
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => ProductDTO)
  async getProductById(@Args('id') id: number): Promise<Products> {
    const product = await this.productService.getProductById(id);
    return product;
  }

  @Mutation(() => ProductDTO)
  async updateProduct(
    @Args('id') id: number,
    @Args('input') input: ProductParam,
  ): Promise<ProductDTO> {
    const updatedProduct = await this.productService.updateProduct(id, input);
    return updatedProduct;
  }

  @Mutation(() => ProductDTO)
  async createProduct(@Args('input') input: ProductParam): Promise<ProductDTO> {
    const createdProduct = await this.productService.createProduct(input);
    return createdProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: number): Promise<boolean> {
    return this.productService.deleteProduct(id);
  }
}
