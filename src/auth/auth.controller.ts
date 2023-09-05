import { Body, Controller, Post, HttpCode, HttpStatus, Request,  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from 'src/authguard/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() CreateUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    return this.authService.register(CreateUserDto);
  }


  @Public()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Request() req): Promise<string> {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    const message = await this.authService.signOut(token);
    return message; // Return the success message
  }
}
