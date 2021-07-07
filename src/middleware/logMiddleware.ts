import { Injectable, NestMiddleware, Res, Req, Next } from '@nestjs/common';
import finished from 'on-finished';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const { method, body, params, query } = req;
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();  
    finished(res, () => {
      const log = `${method}:${fullUrl} ${res.statusCode} body:${JSON.stringify(body)} params:${JSON.stringify(params)} query:${JSON.stringify(query)} \n`;
      if (res.statusCode >= 200 && res.statusCode < 300) {
        fs.appendFileSync(__dirname + '/../../logs/logging.log', log);
        process.stdout.write(log);
      }      
    })
  }
}
