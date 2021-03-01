import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { Token } from 'src/common/interfaces/token';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(@Req() request: Request): Promise<User | null> {
    try {
      const token: Token = verify(
        request.cookies.token,
        process.env.JWT_SECRET,
      ) as Token;
      const user = await this.userRepository.findOne(token.id);

      return user;
    } catch {
      return null;
    }
  }
}
