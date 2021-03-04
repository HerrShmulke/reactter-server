import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostAddInput } from 'src/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Query('posts')
  async getPosts(): Promise<Post[]> {
    return this.postService.findAll([
      'owner',
      'mention',
      'mentionBy',
      'postsLikes',
    ]);
  }

  @UseGuards(AuthGuard)
  @Query('post')
  async getPostById(@Args('id', ParseIntPipe) id: number): Promise<Post> {
    const post = this.postService.findById(id, [
      'owner',
      'mention',
      'mentionBy',
      'postsLikes',
    ]);

    return post;
  }

  @UseGuards(AuthGuard)
  @Mutation('addLike')
  async addLike(
    @Args('postId', ParseIntPipe) postId: number,
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<boolean> {
    try {
      await this.postService.addLike(userId, postId);
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Mutation('addPost')
  async add(@Args('postAddInput') args: PostAddInput): Promise<boolean> {
    try {
      await this.postService.add(args);
      return true;
    } catch (error) {
      return false;
    }
  }
}
