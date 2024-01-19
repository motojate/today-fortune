import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Code, CodeFields, Fortune } from '@prisma/client';
import { CodeService } from 'src/code/code.service';
import { getRandomIndexByList } from 'src/shared/utils/data-handle.util';

@Injectable()
export class FortuneService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly codeService: CodeService,
  ) {}

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

  private async getFortuneStatus(): Promise<Code> {
    const fortuneStatusList = await this.codeService.getCodeByCategory(
      'FORTUNE_STATUS',
    );
    const randomIndex: number = getRandomIndexByList(fortuneStatusList.length);
    return fortuneStatusList[randomIndex];
  }

  private async getRandomFortuneId(fortuneType: CodeFields): Promise<Fortune> {
    try {
      const fortuneStatusCode = await this.getFortuneStatus();

      const fortuneList = await this.prisma.fortune.findMany({
        where: {
          fortuneStatus: fortuneStatusCode.code,
          fortuneType,
        },
      });
      const randomIndex = getRandomIndexByList(fortuneList.length);
      return fortuneList[randomIndex];
    } catch (e) {}
  }

  async createTodayFortune(dto: { userId: number; fortuneType: CodeFields }) {
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
