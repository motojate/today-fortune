import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { FortuneService } from './fortune/fortune.service';
import { FortuneModule } from './fortune/fortune.module';
import { UserModule } from './user/user.module';
import { CodeService } from './code/code.service';
import { CodeModule } from './code/code.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, FortuneModule, UserModule, CodeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FortuneService, CodeService],
})
export class AppModule {}
