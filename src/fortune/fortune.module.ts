import { Module } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  providers: [FortuneService, PrismaService],
})
export class FortuneModule {}
