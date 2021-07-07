import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      const { method, body, params, query } = request;
      const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    const log = `${method}:${fullUrl} ${status} body:${JSON.stringify(body)} params:${JSON.stringify(params)} query:${JSON.stringify(query)} \n`;
    fs.appendFileSync(__dirname + '/../../logs/errors.log', log);
    process.stdout.write(log);
  }
}