import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream'
import fs from 'fs';

const file = fs.createWriteStream('logging.log', { flags: 'a' });

export const logger = (req: Request, res: Response, next: NextFunction): void => {  
  const { method, body, params, query } = req;
  const status = res.statusCode;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  const log = `${method}:${fullUrl} ${status} body:${JSON.stringify(body)} params:${JSON.stringify(params)} query:${JSON.stringify(query)}`;
  next();
  finished(res, () => {
    file.write(`${log}\n`);
  })
};
