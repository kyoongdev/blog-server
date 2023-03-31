import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'database/prisma.service';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Role } from '../interceptor/role.interceptor';
import { Jsonwebtoken } from '../jwt';

export interface JwtUser {
  id: string;
  userType: keyof typeof Role;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly jwt: Jsonwebtoken;
  constructor(private readonly configService: ConfigService, private database: PrismaService) {
    this.jwt = new Jsonwebtoken(this.configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;

    if (!authorization) throw new UnauthorizedException('토큰이 없습니다.');

    const splittedHeader = authorization.split(' ');
    if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer') throw new UnauthorizedException();

    const decoded = this.jwt.verifyJwt<JwtUser>(splittedHeader[1]);

    if (decoded instanceof JsonWebTokenError) throw new UnauthorizedException('TOKEN_EXPIRED');

    const isExist = await this.database.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!isExist) throw new ForbiddenException('권한이 없습니다.');

    req.user = {
      ...isExist,
      userType: decoded.userType,
    };

    return true;
  }
}
