import { requestLogger } from './request';
import { errorLogger } from "./error"
import winston from "winston"

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    exitOnError: true,
    transports: [
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      new winston.transports.File({ filename: 'logging.log' }),
    ],
  });

export { requestLogger, errorLogger };