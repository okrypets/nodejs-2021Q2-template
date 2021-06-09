import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import winston from "winston"

const logger = winston.createLogger({
    level: 'sily',
    format: winston.format.simple(),
    exitOnError: true,
    transports: [
      new winston.transports.Stream({
        stream: process.stderr,
        level: 'debug',
      }),
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      new winston.transports.File({ filename: 'logging.log', level: "info" }),
    ],
  });

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {   
    const { method, body, params, query } = req;
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();  
    finished(res, () => {
      const log = `${method}:${fullUrl} ${res.statusCode} body:${JSON.stringify(body)} params:${JSON.stringify(params)} query:${JSON.stringify(query)}`;
      logger.info(log)
    })
  };

const errorLogger = (message: string): void => {
    logger.error(message)
};

  export const loggerMiddleware = {
      requestLogger,
      errorLogger
  }