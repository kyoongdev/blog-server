import { PrismaService } from 'database/prisma.service';
export declare class AuthService {
    private readonly database;
    constructor(database: PrismaService);
    login(): Promise<void>;
    register(): Promise<void>;
}
