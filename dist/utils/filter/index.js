"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const core_1 = require("@nestjs/core");
const error_filter_1 = require("./error.filter");
exports.Filters = [
    {
        provide: core_1.APP_FILTER,
        useClass: error_filter_1.HttpExceptionFilter,
    },
];
//# sourceMappingURL=index.js.map