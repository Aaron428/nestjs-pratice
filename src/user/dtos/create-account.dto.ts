import { CommonResponseOutput } from '@common/dots/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountResponse extends CommonResponseOutput {}
