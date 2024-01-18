import { Module } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FortuneController } from './fortune.controller';

@Module({
  providers: [FortuneService, PrismaService],
  controllers: [FortuneController],
})
export class FortuneModule {}
