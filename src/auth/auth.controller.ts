import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { LoginAuthDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { ACCESS_TOKEN_KEY } from 'src/shared/constants/data';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(201)
  async login(@Response() res: ExpressResponse, @Body() dto: LoginAuthDto) {
    const tokens = await this.authService.login(dto);
    res.cookie(ACCESS_TOKEN_KEY, tokens.accessToken, { httpOnly: true });
    res.send();
  }
}
