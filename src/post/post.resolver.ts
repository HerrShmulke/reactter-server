import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { InsertResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('posts')
  async getPosts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query('post')
  async getPostById(@Args('id', ParseIntPipe) id: number): Promise<Post> {
    return this.postService.findById(id);
  }

  @Mutation('createPost')
  async create(@Args('createPostInput') args: CreatePostDto): Promise<boolean> {
    try {
      await this.postService.create(args).then(console.log);
      return true;
    } catch {
      return false;
    }
  }
}
