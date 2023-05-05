import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities';

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User
}
