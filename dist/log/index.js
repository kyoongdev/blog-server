"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerOption = exports.winstonLogger = void 0;
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const logger = new winston.transports.Console({
    level: process.env.NODE_ENV === 'prod' ? 'error' : 'silly',
    format: winston.format.combine(winston.format.colorize({
        all: true,
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            debug: 'purple',
        },
    }), winston.format.timestamp(), winston.format.simple(), nest_winston_1.utilities.format.nestLike('MayB', { prettyPrint: true, colors: true })),
});
exports.loggerOption = logger;
const winstonLogger = nest_winston_1.WinstonModule.createLogger({
    transports: [logger],
});
exports.winstonLogger = winstonLogger;
//# sourceMappingURL=index.js.map