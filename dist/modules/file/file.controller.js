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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const guards_1 = require("../../utils/guards");
const role_interceptor_1 = require("../../utils/interceptor/role.interceptor");
const dto_1 = require("./dto");
const file_service_1 = require("./file.service");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadImage(file) {
        return await this.fileService.uploadImage(file);
    }
};
__decorate([
    (0, common_1.Post)('/image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, kyoongdev_nestjs_1.Auth)(guards_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, role_interceptor_1.RoleInterceptorAPI)(role_interceptor_1.Role.ADMIN), (0, platform_express_1.FileInterceptor)('image', { limits: { fileSize: 1024 * 1024 * 10 } })),
    (0, kyoongdev_nestjs_1.RequestApi)({
        body: {
            schema: {
                type: 'object',
                properties: {
                    image: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, kyoongdev_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
    }, 201),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImage", null);
FileController = __decorate([
    (0, swagger_1.ApiTags)('파일'),
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map