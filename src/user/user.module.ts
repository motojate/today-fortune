import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
