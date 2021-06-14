import {Response, Request} from 'express';
import { errorLogger } from "../middleware/index"

export class ErrorHandler extends Error {
    statusCode: number;
    message: string
    constructor(statusCode: number, message: string) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }

export const handleError = (err: ErrorHandler, req: Request, res: Response): void => {
  const { statusCode, message } = err;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const log = `${req.method}:${fullUrl} ${statusCode} message:${message}`;
  
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
    errorLogger(log)
  };

export default { ErrorHandler,  handleError}