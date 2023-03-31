import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class Jsonwebtoken {
  constructor(private readonly configService: ConfigService) {}

  signJwt<T extends object>(value: T, options?: SignOptions): string | any {
    try {
      if (typeof value !== 'string' && typeof value !== 'object' && !Buffer.isBuffer(value)) {
        throw { status: 400, message: 'BadRequest Payload' };
      }

      return jwt.sign(value, this.configService.get<string>('JWT_KEY') as string, options ?? {});
    } catch (error) {
      return new JsonWebTokenError('sign Failed');
    }
  }

  verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any {
    try {
      return jwt.verify(token, this.configService.get<string>('JWT_KEY') as string, options ?? {}) as T;
    } catch (error) {
      return new JsonWebTokenError('sign Failed');
    }
  }
}
