import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';

@InputType()
export class UpdatePasswordInput extends PickType(User, [
  'email',
  'password',
]) {}
