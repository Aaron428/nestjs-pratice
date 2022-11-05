// nestjs
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// orm
import { Repository } from 'typeorm';
// entities
import { User } from './user.entity';
// services
import { JwtService } from '@jwt/jwt.service';
// dtos
import { CommonResponseOutput } from '@common/dots/output.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { UpdatePasswordInput } from './dtos/update-password.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 用户注册
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CommonResponseOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      // 邮箱已被使用
      if (exists) {
        return { ok: false, error: '邮箱已被使用' };
      }
      const newUser = this.users.create({ email, password, role });
      await this.users.save(newUser);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: '创建用户失败' };
    }
  }

  // 修改密码
  async updatePassword({
    email,
    password,
  }: UpdatePasswordInput): Promise<CommonResponseOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (!exists) {
        return { ok: false, error: '未找到对应邮箱的用户' };
      }
      exists.password = password;
      await this.users.update(exists.id, exists);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  // 登录
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const response: LoginOutput = { ok: false };
    try {
      const targetUser = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      // 用户未注册
      const errorData = { error: '用户名或密码错误', token: undefined };
      Object.assign(response, errorData);
      if (!targetUser) return response;
      // 密码错误
      const checkPsdRet = await targetUser.checkPassword(password);
      if (!checkPsdRet) return response;
      const token = this.jwtService.sign({ id: targetUser.id });
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findUserById(id: number): Promise<User> {
    const res = await this.users.findOne({ where: { id } });
    if (!res) {
      throw new BadRequestException('用户不存在');
    }
    return res;
  }
}
