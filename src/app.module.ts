import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: process.env.NODE_ENV !== 'production',
      database: 'reactter.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
