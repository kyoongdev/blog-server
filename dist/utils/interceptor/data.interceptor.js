"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInterceptor = void 0;
const rxjs_1 = require("rxjs");
class DataInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => ({ data })));
    }
}
exports.DataInterceptor = DataInterceptor;
//# sourceMappingURL=data.interceptor.js.map