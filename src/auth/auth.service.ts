import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from 'src/auth/dtos/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  InvalidAuthException,
  InvalidPasswordException,
} from 'src/shared/exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private createToken(id: number): string {
    const payload = { id };
    return this.jwtService.sign(payload);
  }

  private async validateUser(dto: LoginAuthDto): Promise<User> {
    try {
      const user = await this.userService.findUniqueByUserId(dto.userId);
      if (!user) throw new InvalidAuthException();
      const isValidPassword = await bcrypt.compare(dto.password, user.password);
      if (!isValidPassword) throw new InvalidPasswordException();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginAuthDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(dto);
    return { accessToken: this.createToken(user.id) };
  }
}
