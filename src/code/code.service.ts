import { Injectable } from '@nestjs/common';
import { Code, CodeCategoryFields } from '@prisma/client';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CodeService {
  constructor(private readonly prisma: PrismaService) {}

  async getCodeByCategory(category: CodeCategoryFields): Promise<Code[]> {
    try {
      const codes = await this.prisma.code.findMany({
        where: {
          categoryName: category,
        },
      });
      return codes;
    } catch (e) {
      throw new PrismaException(e);
    }
  }
}
