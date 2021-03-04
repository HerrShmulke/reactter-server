import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      cors: {
        credentials: true,
        origin: ['http://localhost:3000'],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: process.env.NODE_ENV !== 'production',
      database: 'reactter.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    ConfigModule.forRoot(),
    TokenModule,
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
