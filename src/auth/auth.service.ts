import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IToken } from 'src/common/interfaces/token';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  /**
   * @todo replace repository to service
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @todo add uuid4 library
   */
  async setRefreshToken(response: Response) {
    /// uuid4
    const token: string = undefined;

    /// Temp time @todo fix
    response.cookie('refresh_token', token, { maxAge: 999e10, httpOnly: true });
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
