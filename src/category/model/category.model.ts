import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductDTO } from 'src/product/model/product.model';

@ObjectType()
export class CategoryDTO {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductDTO]) 
  products?: ProductDTO[];
}
