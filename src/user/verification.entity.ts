import { Column, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { User } from './user.entity';

@InputType()
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field()
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
