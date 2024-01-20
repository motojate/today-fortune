import { Module } from '@nestjs/common';
import { FortuneService } from 'src/fortune/fortune.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FortuneController } from 'src/fortune/fortune.controller';
import { CodeService } from 'src/code/code.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FortuneService, PrismaService, CodeService, JwtService],
  controllers: [FortuneController],
})
export class FortuneModule {}
