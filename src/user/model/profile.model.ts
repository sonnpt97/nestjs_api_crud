import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class ProfileDto {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  photo: string;
}