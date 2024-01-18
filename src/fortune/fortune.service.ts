import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Fortune, FortuneStatus, FortuneType } from '@prisma/client';

@Injectable()
export class FortuneService {
  constructor(private readonly prisma: PrismaService) {}

  async checkTodayFortuneAvailability() {
    const todayStart = dayjs().startOf('day');
    const tomorrowStart = dayjs().add(1, 'day').startOf('day');

    try {
      const fortune = await this.prisma.userFortuneMapping.findFirst({
        where: {
          userId: 1,
          createdAt: {
            gte: todayStart.toDate(),
            lt: tomorrowStart.toDate(),
          },
        },
        select: {
          fortune: true,
        },
      });

      return fortune;
    } catch (e) {}
  }

  private getFortuneStatus(): FortuneStatus {
    const randomNumber: number = Math.floor(Math.random() * 3) + 1;
    const fortuneStatusMapper: { [key in number]: FortuneStatus } = {
      1: 'BAD',
      2: 'AVERAGE',
      3: 'GOOD',
    };
    return fortuneStatusMapper[randomNumber];
  }

  private async getRandomFortuneId(fortuneType: FortuneType): Promise<Fortune> {
    const fortuneStatus: FortuneStatus = this.getFortuneStatus();
    try {
      const fortuneList = await this.prisma.fortune.findMany({
        where: {
          fortuneStatus,
          fortuneType,
        },
      });
      const randomIndex = Math.floor(Math.random() * fortuneList.length);
      return fortuneList[randomIndex];
    } catch (e) {}
  }

  async createTodayFortune(dto: { userId: number; fortuneType: FortuneType }) {
    try {
      const fortune = await this.getRandomFortuneId(dto.fortuneType);
      await this.prisma.userFortuneMapping.create({
        data: {
          user: {
            connect: {
              id: dto.userId,
            },
          },
          fortune: {
            connect: {
              id: fortune.id,
            },
          },
        },
      });
      return fortune;
    } catch (e) {}
  }
}
