import * as winston from 'winston';
declare const logger: winston.transports.ConsoleTransportInstance;
declare const winstonLogger: import("@nestjs/common").LoggerService;
export { winstonLogger, logger as loggerOption };
