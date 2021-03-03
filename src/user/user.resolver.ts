import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserRegisterInput } from 'src/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Query('user')
  async getUser(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation('userLogin')
  async authorize(
    @Context() context: any,
    @Args('name') name: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    return this.authService.authorize(name, password, context.req.res);
  }

  @Mutation('registerUser')
  async createUser(
    @Args('userRegisterInput') args: UserRegisterInput,
  ): Promise<boolean> {
    try {
      await this.userService.create(args);
      return true;
    } catch (error) {
      return false;
    }
  }
}
