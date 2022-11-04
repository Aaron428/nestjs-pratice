import { CommonResponseOutput } from '@common/dots/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '@user/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CommonResponseOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
