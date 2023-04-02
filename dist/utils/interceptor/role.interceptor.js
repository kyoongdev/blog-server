"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleInterceptorAPI = exports.Role = void 0;
const common_1 = require("@nestjs/common");
exports.Role = {
    USER: 'USER',
    ADMIN: 'ADMIN',
};
const RoleInterceptorAPI = (role, nullable) => {
    class RoleInterceptor {
        intercept(context, next) {
            const req = context.switchToHttp().getRequest();
            if (!req.user && !nullable)
                throw new common_1.UnauthorizedException('로그인을 진행해주세요.');
            if (role && !nullable) {
                if (role === exports.Role.ADMIN) {
                    if (req.user.userType !== exports.Role.ADMIN)
                        throw new common_1.UnauthorizedException('권한이 없습니다.');
                }
                else {
                    if (req.user.userType !== exports.Role.USER || req.user.userType !== exports.Role.ADMIN)
                        throw new common_1.UnauthorizedException('권한이 없습니다.');
                }
            }
            return next.handle();
        }
    }
    return (0, common_1.mixin)(RoleInterceptor);
};
exports.RoleInterceptorAPI = RoleInterceptorAPI;
//# sourceMappingURL=role.interceptor.js.map