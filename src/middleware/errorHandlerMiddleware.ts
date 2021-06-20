import {Response, Request, NextFunction} from 'express';
import { loggerMiddleware } from "../middleware/loggerMiddleware"

export class ErrorHandler extends Error {
    statusCode: number;
    message: string
    constructor(statusCode: number, message: string) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (err: ErrorHandler, req: Request, res: Response, _next: NextFunction): void => {
let log = "Error"
  if (err instanceof ErrorHandler) {
      const { statusCode, message } = err;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  log = `${req.method}:${fullUrl} ${statusCode} message:${message}`;
  
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  } else {
    const statusCode = 500
    const message =  "Internal server error"
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
    log = `${statusCode} ${message}`
   
  }
  loggerMiddleware.errorLogger(log)
  };
