import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000m' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
