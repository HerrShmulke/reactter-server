import { Inject, Injectable, Req, Res, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { verify, sign } from 'jsonwebtoken';
import { Token } from 'src/common/interfaces/token';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async getUser(): Promise<User | null> {
    try {
      const token: Token = verify(
        this.request.cookies.token,
        process.env.JWT_SECRET,
      ) as Token;
      const user = await this.userRepository.findOne(token.id);

      return user;
    } catch {
      return null;
    }
  }

  async authorize(name: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne(1);

      let token: Token = { id: user.id };

      this.request.res.cookie(
        'token',
        sign(token, process.env.JWT_SECRET, { expiresIn: '5m' }),
        { maxAge: 300000 },
      );

      return true;
    } catch (err) {
      return false;
    }
  }
}
