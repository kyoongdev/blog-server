"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../user/dto");
const user_service_1 = require("../user/user.service");
const nanoid_1 = require("nanoid");
const jwt_1 = require("../../utils/jwt");
const dto_2 = require("./dto");
let AuthService = class AuthService {
    constructor(database, userService, jwt) {
        this.database = database;
        this.userService = userService;
        this.jwt = jwt;
    }
    async login(props) {
        const user = await this.userService.findUserByUserId(props.userId);
        user.comparePassword(props.password);
        return this.createToken(user.id, user.userType);
    }
    async register(props) {
        const isExist = await this.userService.checkUserByUserId(props.userId);
        if (isExist)
            throw new common_1.ConflictException('이미 존재하는 아이디입니다.');
        const user = await this.userService.createUser(new dto_1.CreateUserDTO({ userId: props.userId, password: props.password }));
        return this.createToken(user, isExist.userType);
    }
    async refresh(props) {
        const { accessToken, refreshToken } = props;
        const accessTokenPayload = this.jwt.verifyJwt(accessToken, {
            ignoreExpiration: true,
        });
        const refreshTokenPayload = this.jwt.verifyJwt(refreshToken);
        if (!accessTokenPayload)
            throw new common_1.BadRequestException('잘못된 액세스 토큰입니다.');
        if (!refreshTokenPayload)
            throw new common_1.BadRequestException('잘못된 리프레쉬 토큰이거나 유효기간이 지난 리프레쉬 토큰입니다.');
        if (accessTokenPayload.key !== refreshTokenPayload.key)
            throw new common_1.BadRequestException('토큰 key 값이 일치하지 않습니다.');
        if (accessTokenPayload.id !== refreshTokenPayload.id)
            throw new common_1.BadRequestException('토큰 id 값이 일치하지 않습니다.');
        return this.createToken(refreshTokenPayload.id, refreshTokenPayload.userType);
    }
    createToken(id, userType) {
        const key = (0, nanoid_1.nanoid)();
        const accessToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '2h' });
        const refreshToken = this.jwt.signJwt({ id, userType, key }, { expiresIn: '14d' });
        return new dto_2.TokenDTO(accessToken, refreshToken);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.Jsonwebtoken])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map