import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const logger = new winston.transports.Console({
  level: process.env.NODE_ENV === 'prod' ? 'error' : 'silly',
  format: winston.format.combine(
    winston.format.colorize({
      all: true,
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'purple',
      },
    }),
    winston.format.timestamp(),
    winston.format.simple(),
    utilities.format.nestLike('MayB', { prettyPrint: true, colors: true })
  ),
});

const winstonLogger = WinstonModule.createLogger({
  transports: [logger],
});
export { winstonLogger, logger as loggerOption };
