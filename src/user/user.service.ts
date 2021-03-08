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

  findById(id: number, relations: string[] = []): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: relations,
    });
  }

  findByName(name: string, relations: string[] = []): Promise<User> {
    return this.userRepository.findOne({
      where: {
        name: name,
      },
      relations: relations,
    });
  }

  async create(user: UserRegisterInput): Promise<InsertResult> {
    const newUser = this.userRepository.create();
    newUser.name = user.name;
    newUser.avatarUrl = '/avatar.png';

    await newUser.setPassword(user.password);

    return this.userRepository.insert(newUser);
  }
}
