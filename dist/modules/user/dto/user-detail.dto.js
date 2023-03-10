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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailDTO = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class UserDetailDTO {
    constructor(props) {
        this.id = props.id;
        this.userId = props.userId;
        this.name = props.name;
        this.socialId = props.socialId;
        this.password = props.password;
        this.createdAt = props.createdAt?.toISOString();
        this.updatedAt = props.updatedAt?.toISOString();
    }
    async comparePassword(password) {
        return await bcrypt_1.default.compare(password, this.password);
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "userId", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "password", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "socialId", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", String)
], UserDetailDTO.prototype, "updatedAt", void 0);
exports.UserDetailDTO = UserDetailDTO;
//# sourceMappingURL=user-detail.dto.js.map