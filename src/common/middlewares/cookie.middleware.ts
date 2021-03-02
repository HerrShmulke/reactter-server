import { NestMiddleware } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export class CookieMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    cookieParser()(req, res, next);
  }
}
