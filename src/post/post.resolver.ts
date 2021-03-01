import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PostCreateInput } from 'src/graphql';
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
    const post = this.postService.findById(id);

    return post;
  }

  @Mutation('createPost')
  async create(
    @Args('postCreateInput') args: PostCreateInput,
  ): Promise<boolean> {
    try {
      await this.postService.create(args);
      return true;
    } catch (e) {
      return false;
    }
  }
}
