import { ConfigService } from '@nestjs/config';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
export declare class Jsonwebtoken {
    private readonly configService;
    constructor(configService: ConfigService);
    signJwt<T extends object>(value: T, options?: SignOptions): string | any;
    verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any;
}
