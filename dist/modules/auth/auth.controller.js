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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(props) {
        return this.authService.login(props);
    }
    async register(props) {
        return this.authService.register(props);
    }
    async refresh(body) {
        return await this.authService.refresh(body);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 로그인',
        description: '로그인을 합니다.',
    }),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.LoginDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.TokenDTO,
    }, 200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: '[서비스] 회원가입',
        description: '회원가입을 합니다.',
    }),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.RegisterDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.TokenDTO,
    }, 200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            type: dto_1.TokenDTO,
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('로그인/회원가입'),
    (0, common_1.Controller)(['auth']),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map