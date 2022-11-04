import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonResponseOutput {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
