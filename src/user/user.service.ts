import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
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
    } catch (e) {
      throw new PrismaException(e);
    }
  }

  async findUniqueByUserId(userId: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          userId,
        },
      });
    } catch (e) {
      throw new PrismaException(e);
    }
  }
}
