import { CanActivate, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: any): boolean | Promise<boolean> | Observable<boolean> {
    const token: string = context.switchToHttp().args[2].req.cookies.token;

    try {
      if (token && verify(token, process.env.JWT_SECRET)) return true;
    } catch {
      return false;
    }
  }
}
