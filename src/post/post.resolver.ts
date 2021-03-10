import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { IToken } from 'src/common/interfaces/token';
import { PostCreateInput, PostAddLikeInput } from 'src/graphql';
import { Token } from 'src/token/token.decorator';
import { TokenService } from 'src/token/token.service';
import { Post } from './post.entity';
import { Post as GraphPost } from 'src/graphql';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly tokenSerice: TokenService,
  ) {}

  @UseGuards(AuthGuard)
  @Query('posts')
  async getPosts(): Promise<Post[]> {
    const posts = await this.postService.findAll([
      'owner',
      'mention',
      'mentionBy',
      'usersLikes',
    ]);

    return posts;
  }

  @UseGuards(AuthGuard)
  @Query('post')
  async getPostById(@Args('id', ParseIntPipe) id: number): Promise<Post> {
    const post = this.postService.findById(id, [
      'owner',
      'mention',
      'mentionBy',
      'usersLikes',
    ]);

    return post;
  }

  @UseGuards(AuthGuard)
  @Mutation('postAddLike')
  async addLike(@Args('input') input: PostAddLikeInput): Promise<boolean> {
    try {
      await this.postService.addLike(input.userId, input.postId);
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Mutation('postCreate')
  async create(
    @Args('input') args: PostCreateInput,
    @Token() strToken: string,
  ): Promise<boolean> {
    try {
      const token: IToken = this.tokenSerice.stringToAccessToken(strToken);
      await this.postService.create(args, token.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
