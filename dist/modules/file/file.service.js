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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
let FileService = class FileService {
    constructor(bucketService, config) {
        this.bucketService = bucketService;
        this.config = config;
    }
    async uploadImage(file) {
        const params = {
            Bucket: 'kyoongdev-blog',
            Key: file.originalname,
            Body: file.buffer,
            ACL: 'public-read',
        };
        const result = await this.bucketService.upload(params);
        if (!result)
            throw new common_1.InternalServerErrorException('업로드에 실패했습니다.');
        return new dto_1.UploadedFileDTO(result);
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utils_1.BucketService, config_1.ConfigService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map