import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, context: any) => {
  return context.switchToHttp().args[2].req.cookies.access_token;
});
