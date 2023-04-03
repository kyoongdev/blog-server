"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCookieInterceptor = void 0;
const request_ip_1 = require("request-ip");
const rxjs_1 = require("rxjs");
class UserCookieInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            response.cookie('f' + request.path, (0, request_ip_1.getClientIp)(request), {
                maxAge: 1200000,
            });
            return data;
        }));
    }
}
exports.UserCookieInterceptor = UserCookieInterceptor;
//# sourceMappingURL=user-cookie.interceptor.js.map