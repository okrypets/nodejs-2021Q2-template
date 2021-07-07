import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./ormconfig";
import { UserModule } from "./users/users.module";
import { BoardModule } from "./boards/boars.module";
import { TaskModule } from "./tasks/tasks.module";
import { LoginModule } from "./login/login.module";
import { LoggerMiddleware } from "./middleware/logMiddleware";
import { UserController } from "./users/users.controller";
import { TaskController } from "./tasks/tasks.controller";
import { BoardController } from "./boards/boards.controller";
import { LoginController } from "./login/login.controller";


@Module({
imports: [TypeOrmModule.forRoot(config),
    UserModule,
    BoardModule,
    TaskModule,
    LoginModule,
],
  
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes(UserController, TaskController, BoardController, LoginController );
    }
  }