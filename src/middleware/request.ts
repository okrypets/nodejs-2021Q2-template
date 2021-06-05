import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { logger } from './index';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {  
  const { method, body, params, query } = req;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  next();  
  finished(res, () => {
    const log = `${method}:${fullUrl} ${res.statusCode} body:${JSON.stringify(body)} params:${JSON.stringify(params)} query:${JSON.stringify(query)}`;
    process.stdout.write(log)
    logger.info(log)
  })
};
