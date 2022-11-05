// nestjs
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
// service
import { UserService } from './user.service';
// entities
import { User } from './user.entity';
// dots
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { UpdatePasswordInput } from './dtos/update-password.dto';
import { CommonResponseOutput } from '@common/dots/output.dto';
import { AuthGuard } from '@auth/auth.guard';
import { AuthUser } from '@auth/auth-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() loginUser: User) {
    return loginUser;
  }

  // 修改密码
  @Mutation(() => CommonResponseOutput)
  async updatePassword(
    @Args('input') updatePasswordInput: UpdatePasswordInput,
  ): Promise<CommonResponseOutput> {
    return this.userService.updatePassword(updatePasswordInput);
  }

  // 创建用户
  @Mutation(() => CommonResponseOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CommonResponseOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  // 登录
  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }
}
