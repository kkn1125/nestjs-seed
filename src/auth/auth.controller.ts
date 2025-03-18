import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LocalAuthGuard()
  @Post('login')
  login(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @ApiCookieAuth()
  @Post('logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
