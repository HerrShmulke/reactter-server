import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { UserRegisterInput } from 'src/graphql';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ['ownedPosts', 'postsLikes'],
    });
  }

  findByName(name: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async create(user: UserRegisterInput): Promise<InsertResult> {
    const newUser = this.userRepository.create();
    newUser.name = user.name;

    await newUser.setPassword(user.password);

    return this.userRepository.insert(newUser);
  }
}
