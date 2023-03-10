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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const user_exception_1 = require("./user.exception");
let UserService = class UserService {
    constructor(database, exception) {
        this.database = database;
        this.exception = exception;
    }
    async findUser(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
        });
        this.exception.userNotFound(user);
        return new dto_1.UserDetailDTO(user);
    }
    async findUserByUserId(userId) {
        const user = await this.database.user.findUnique({
            where: {
                userId,
            },
        });
        this.exception.userNotFound(user);
        return new dto_1.UserDetailDTO(user);
    }
    async findUserBySocialId(socialId) {
        const user = await this.database.user.findUnique({
            where: {
                socialId,
            },
        });
        this.exception.userNotFound(user);
    }
    async createUser(props) { }
    async updateUser(id, props) { }
    async deleteUser(id) { }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, user_exception_1.UserException])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map