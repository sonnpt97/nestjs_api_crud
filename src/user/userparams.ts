import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserParams {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;
}
