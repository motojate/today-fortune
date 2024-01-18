import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { FortuneService } from './fortune/fortune.service';
import { FortuneModule } from './fortune/fortune.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, FortuneModule, UserModule],
  controllers: [AppController],
  providers: [AppService, FortuneService],
})
export class AppModule {}
