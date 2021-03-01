import { ParseIntPipe } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserRegisterInput } from 'src/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async getUser(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation('registerUser')
  async createUser(
    @Args('userRegisterInput') args: UserRegisterInput,
  ): Promise<boolean> {
    try {
      await this.userService.create(args);
      return true;
    } catch (e) {
      return false;
    }
  }
}
