import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from "./resources/login/login.router";
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { validationMiddleware } from "./middleware/validationMiddleware";
import { createAdminUserMiddleware } from "./middleware/createAdminUserMiddleware";

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(loggerMiddleware.requestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(createAdminUserMiddleware)

app.use(validationMiddleware)

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorHandlerMiddleware)

process.on('uncaughtException', (err: Error, origin: string) => {  
  loggerMiddleware.errorLogger(`${origin}: ${err.message}`);
  setTimeout(() => process.exit(1), 1000);
});
// throw Error('Oops!');

process.on('unhandledRejection', (reason: Error ):void => {
  loggerMiddleware.errorLogger(`unhandledRejection at Promise with reason: ${reason.message}`)
});
// Promise.reject(Error('Oops!'));

export default app;
