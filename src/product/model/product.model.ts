import { Category } from 'src/sql/category/category.entity';
import { ObjectType, Field, ID, Float, InputType, Int } from '@nestjs/graphql';
import { CategoryDTO } from 'src/category/model/category.model';

@ObjectType()
export class ProductDTO {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => CategoryDTO) 
  category: CategoryDTO;

  @Field(() => ID)
  categoryId: number;
}

@InputType()
export class ProductParam {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;
}

@InputType()
export class CategoryParam {
  @Field({ nullable: true })
  name?: string;
}
