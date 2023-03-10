import { PrismaService } from 'database/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
export declare class AuthService {
    private readonly database;
    constructor(database: PrismaService);
    login(props: LoginDTO): Promise<void>;
    register(props: RegisterDTO): Promise<void>;
}
