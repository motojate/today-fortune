import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FortuneService } from 'src/fortune/fortune.service';
import { FortuneModule } from 'src/fortune/fortune.module';
import { UserModule } from 'src/user/user.module';
import { CodeService } from 'src/code/code.service';
import { CodeModule } from 'src/code/code.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, FortuneModule, UserModule, CodeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FortuneService, CodeService],
})
export class AppModule {}
