import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CodeService } from 'src/code/code.service';
import { CodeController } from 'src/code/code.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CodeService, PrismaService, JwtService],
  controllers: [CodeController],
})
export class CodeModule {}
