"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqUser = void 0;
const common_1 = require("@nestjs/common");
exports.ReqUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = await ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=user.decorators.js.map