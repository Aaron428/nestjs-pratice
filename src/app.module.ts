// nestjs
import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
// orm
import { TypeOrmModule } from '@nestjs/typeorm';
// tools
import { join } from 'path';
import * as Joi from 'joi';
// modules
// import { RestaurantModule } from '@restaurant/restaurant.module';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from '@user/user.module';
// entities
// import { Restaurant } from '@restaurant/entities/restaurant.entity';
import { User } from '@user/user.entity';
import { NestModule } from '@nestjs/common';
import { Verification } from '@user/verification.entity';
// middleware
import { JwtMiddleware } from '@jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PSD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PSD,
      username: process.env.DB_USERNAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      // logging: true,
      entities: [User, Verification],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req['user'] }),
    }),
    // RestaurantModule,
    UserModule,
    JwtModule.forRoot({ privateKey: process.env.SECRET_KEY }),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
