// nestjs
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
// orm
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
// tools
import { hash, compare } from 'bcrypt';
import { IsEmail, IsEnum, Length } from 'class-validator';
// entity
import { CoreEntity } from '@common/entities/core.entity';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field(() => String)
  @IsEmail()
  @Column()
  email: string;

  @Field(() => String)
  @Column({ select: false })
  @Length(6, 32)
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  // 修改密码和注册用户时对密码加盐
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  // 密码校验
  async checkPassword(pwd: string): Promise<boolean> {
    try {
      return await compare(pwd, this.password);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
