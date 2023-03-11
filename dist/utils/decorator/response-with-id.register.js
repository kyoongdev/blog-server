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
exports.ResponseWithIdRegister = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const response_with_id_1 = require("./response-with-id");
let ResponseWithIdRegister = class ResponseWithIdRegister {
    constructor(discoveryService, metadataScanner, reflector) {
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
        this.reflector = reflector;
    }
    onModuleInit() {
        this.discoveryService
            .getControllers()
            .filter((wrapper) => wrapper.isDependencyTreeStatic())
            .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
            .forEach(({ instance, metatype }) => {
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (methodKey) => {
                if (metatype) {
                    const isResponseWithId = this.reflector.get(response_with_id_1.RESPONSE_WITH_ID, instance[methodKey]);
                    methodKey === 'findUsers' && console.log({ isResponseWithId }, instance[methodKey], metatype);
                    if (isResponseWithId) {
                    }
                }
            });
        });
    }
};
ResponseWithIdRegister = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner,
        core_1.Reflector])
], ResponseWithIdRegister);
exports.ResponseWithIdRegister = ResponseWithIdRegister;
//# sourceMappingURL=response-with-id.register.js.map