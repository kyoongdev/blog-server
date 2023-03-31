import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'database/prisma.service';
import { Role } from '../interceptor/role.interceptor';
export interface JwtUser {
    id: string;
    userType: keyof typeof Role;
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly configService;
    private database;
    private readonly jwt;
    constructor(configService: ConfigService, database: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
