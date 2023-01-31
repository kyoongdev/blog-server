"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorsInterceptor = class ErrorsInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => {
            let message = err.message
                ? Array.isArray(err.message)
                    ? err.message.join(',')
                    : err.message
                : 'Internal Server Error';
            if (message === 'Internal Server Error' && err.stack) {
                message = err.stack;
            }
            if (err instanceof common_1.InternalServerErrorException) {
                return new common_1.InternalServerErrorException(message);
            }
            throw err;
        })));
    }
};
ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorsInterceptor);
exports.ErrorsInterceptor = ErrorsInterceptor;
//# sourceMappingURL=error.interceptor.js.map