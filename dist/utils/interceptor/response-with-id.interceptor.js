"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWithIdInterceptor = void 0;
const rxjs_1 = require("rxjs");
class ResponseWithIdInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => ({ id: data })));
    }
}
exports.ResponseWithIdInterceptor = ResponseWithIdInterceptor;
//# sourceMappingURL=response-with-id.interceptor.js.map