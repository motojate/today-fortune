import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(id: number): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {}
  }

  async findUniqueByUserId(userId: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          userId,
        },
      });
    } catch (e) {}
  }
}
