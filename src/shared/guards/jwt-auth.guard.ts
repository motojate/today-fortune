import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ExpiredTokenException,
  InvalidTokenException,
  NullTokenException,
} from 'src/shared/exceptions/token.exception';
import { ACCESS_TOKEN_KEY } from 'src/shared/constants/data';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from 'src/shared/types/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[ACCESS_TOKEN_KEY];
    if (!accessToken) throw new NullTokenException();

    const paylod = this.validateToken(accessToken);
    if (paylod) {
      request.user = paylod;
      return true;
    } else return false;
  }

  private validateToken(token: string): PayloadInterface {
    try {
      const payload = this.jwtService.verify<PayloadInterface>(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (e: any) {
      switch (e.name) {
        case 'TokenExpiredError':
          throw new ExpiredTokenException();
        case 'JsonWebTokenError':
        default:
          throw new InvalidTokenException();
      }
    }
  }
}
