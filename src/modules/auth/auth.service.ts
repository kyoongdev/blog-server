import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateUserDTO } from 'modules/user/dto';
import { UserService } from 'modules/user/user.service';
import { nanoid } from 'nanoid';
import { Role } from 'utils/interceptor/role.interceptor';
import { Jsonwebtoken } from 'utils/jwt';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: PrismaService,
    private readonly userService: UserService,
    private jwt: Jsonwebtoken
  ) {}

  async login(props: LoginDTO) {
    const user = await this.userService.findUserByUserId(props.userId);

    const isMatch = await user.comparePassword(props.password);
    if (!isMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return this.createToken(user.id, user.userType);
  }

  async register(props: RegisterDTO) {
    const isExist = await this.userService.checkUserByUserId(props.userId);
    if (isExist) throw new ConflictException('이미 존재하는 아이디입니다.');

    const isNameExist = await this.userService.checkUserByName(props.name);
    if (isNameExist) throw new ConflictException('이미 존재하는 이름입니다.');

    const user = await this.userService.createUser(
      new CreateUserDTO({ userId: props.userId, password: props.password, name: props.name })
    );

    return this.createToken(user, Role.USER);
  }

  async refresh(props: TokenDTO): Promise<TokenDTO> {
    const { accessToken, refreshToken } = props;
    const accessTokenPayload = this.jwt.verifyJwt<{ id: string; userType: keyof typeof Role; key: string }>(
      accessToken,
      {
        ignoreExpiration: true,
      }
    );
    const refreshTokenPayload = this.jwt.verifyJwt<{ id: string; userType: keyof typeof Role; key: string }>(
      refreshToken
    );

    if (!accessTokenPayload) throw new BadRequestException('잘못된 액세스 토큰입니다.');
    if (!refreshTokenPayload)
      throw new BadRequestException('잘못된 리프레쉬 토큰이거나 유효기간이 지난 리프레쉬 토큰입니다.');

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new BadRequestException('토큰 key 값이 일치하지 않습니다.');
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new BadRequestException('토큰 id 값이 일치하지 않습니다.');

    return this.createToken(refreshTokenPayload.id, refreshTokenPayload.userType);
  }

  createToken(id: string, userType: keyof typeof Role): TokenDTO {
    const key = nanoid();
    const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
    const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });

    return new TokenDTO(accessToken, refreshToken);
  }
}
