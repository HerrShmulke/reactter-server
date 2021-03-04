import { createParamDecorator } from '@nestjs/common';
import { IToken } from '../common/interfaces/token';
import { verify } from 'jsonwebtoken';

export const Token = createParamDecorator((data: unknown, context: any) => {
  const stringToken: string = context.switchToHttp().args[2].req.cookies.token;

  try {
    const token: IToken = verify(stringToken, process.env.JWT_SECRET) as IToken;

    return token;
  } catch {
    return undefined;
  }
});
