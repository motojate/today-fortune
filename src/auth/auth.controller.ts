import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { LoginAuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(201)
  async login(@Response() res: ExpressResponse, @Body() dto: LoginAuthDto) {
    const tokens = await this.authService.login(dto);
    res.cookie('access_token', tokens.accessToken, { httpOnly: true });
    res.send();
  }
}
