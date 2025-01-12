import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileDto } from './profile.model';


@ObjectType()
export class UserDTO {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => ProfileDto, { nullable: true })
  profile?: ProfileDto;
}