import { Field, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updateAt: Date;
}
