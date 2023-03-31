import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(props: LoginDTO): Promise<TokenDTO>;
    register(props: RegisterDTO): Promise<TokenDTO>;
    refresh(body: TokenDTO): Promise<TokenDTO>;
}
