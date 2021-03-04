import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async authorize(name: string, password: string): Promise<Token | undefined> {
    try {
      const user = await this.userService.findByName(name);

      if (user && (await argon2.verify(await user.getPassword(), password))) {
        const tokens = await this.tokenService.generateNewPairForUser(user);

        return tokens;
      }

      return undefined;
    } catch (err) {
      return undefined;
    }
  }
}
