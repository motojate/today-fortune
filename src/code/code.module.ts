import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CodeService } from './code.service';

@Module({
  providers: [CodeService, PrismaService],
})
export class CodeModule {}
