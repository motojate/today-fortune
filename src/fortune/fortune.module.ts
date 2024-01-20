import { Module } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FortuneController } from './fortune.controller';
import { CodeService } from 'src/code/code.service';

@Module({
  providers: [FortuneService, PrismaService, CodeService],
  controllers: [FortuneController],
})
export class FortuneModule {}
