import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { verify, sign } from 'jsonwebtoken';
import { IToken } from 'src/common/interfaces/token';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserFromToken(stringToken: string): Promise<User | undefined> {
    try {
      const token: IToken = verify(
        stringToken,
        process.env.JWT_SECRET,
      ) as IToken;
      const user = await this.userRepository.findOne(token.id);

      return user;
    } catch {
      return undefined;
    }
  }

  async authorize(
    name: string,
    password: string,
    response: Response,
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          name: name,
        },
      });

      if (user && (await argon2.verify(await user.getPassword(), password))) {
        let token: IToken = { id: user.id };

        response.cookie(
          'token',
          sign(token, process.env.JWT_SECRET, { expiresIn: '30m' }),
          { maxAge: 1.8e6 },
        );

        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
