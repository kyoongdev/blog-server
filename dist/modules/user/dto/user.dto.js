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
exports.UserDTO = void 0;
const client_1 = require("@prisma/client");
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
class UserDTO {
    constructor(props) {
        this.id = props.id;
        this.userId = props.userId;
        this.name = props.name;
        this.userType = props.userType;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "userId", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], UserDTO.prototype, "name", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', enum: Object.keys(client_1.UserType) } }),
    __metadata("design:type", String)
], UserDTO.prototype, "userType", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", Date)
], UserDTO.prototype, "createdAt", void 0);
__decorate([
    (0, kyoongdev_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true } }),
    __metadata("design:type", Date)
], UserDTO.prototype, "updatedAt", void 0);
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map