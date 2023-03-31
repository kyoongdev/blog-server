import { PrismaService } from 'database/prisma.service';
import { UserService } from 'modules/user/user.service';
import { Role } from 'utils/interceptor/role.interceptor';
import { Jsonwebtoken } from 'utils/jwt';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
export declare class AuthService {
    private readonly database;
    private readonly userService;
    private jwt;
    constructor(database: PrismaService, userService: UserService, jwt: Jsonwebtoken);
    login(props: LoginDTO): Promise<TokenDTO>;
    register(props: RegisterDTO): Promise<TokenDTO>;
    refresh(props: TokenDTO): Promise<TokenDTO>;
    createToken(id: string, userType: keyof typeof Role): TokenDTO;
}
