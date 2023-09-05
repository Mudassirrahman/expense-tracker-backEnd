import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule, UsersModule],
  providers: [JwtService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
