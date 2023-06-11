"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const common_1 = require("@nestjs/common");
exports.Cookie = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.cookies['f' + req.path];
});
//# sourceMappingURL=cookie.js.map