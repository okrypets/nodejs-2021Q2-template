import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { errorLogger } from "./middleware/index";

import express, {Request, Response, NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { handleError, ErrorHandler } from './common/ErrorHandler';

process.on('uncaughtException', (err: Error, origin: string) => {  
  errorLogger(`${origin}: ${err.message}`)
});

process.on('unhandledRejection', (reason: Error ):void => {
  errorLogger(`unhandledRejection at Promise with reason: ${reason.message}`)
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
 if (err instanceof ErrorHandler) {
    handleError(err, req, res)
} else {
  const statusCode = 500
  const message =  "Internal server error"
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
  errorLogger(`${statusCode} ${message}`)
}
})

export default app;
