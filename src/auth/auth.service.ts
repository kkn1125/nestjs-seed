import { PrismaService } from '@/database/prisma.service';
import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  secret: ReturnType<SecretConf>;

  get client() {
    return this.prisma.client;
  }

  constructor(
    private readonly commonService: CommonService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    const secret = commonService.getConfig<SecretConf>('secret');
    this.secret = secret;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const userInfo = await this.prisma.user.findUnique({
      where: { email: loginAuthDto.email },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        state: true,
      },
    });

    if (!userInfo) {
      throw new NotFoundException();
    }

    return this.jwtService.sign(userInfo);
  }

  logout(res: Response) {
    return res.clearCookie(this.secret.cookieName.refresh);
  }

  async validateUser(email: string, userPassword: string) {
    const user = await this.client.user.findUnique({
      where: { email },
      include: {
        userSecret: true,
      },
    });

    if (!user || !user.userSecret) {
      throw new BadRequestException();
    }

    const isVerified = this.client.user.verifyPassword(
      userPassword,
      user.userSecret.password,
      user.userSecret.salt,
      user.userSecret.iteration,
    );

    if (!isVerified) {
      return null;
    }

    const { userSecret, ...result } = user;
    return result;
  }
}
