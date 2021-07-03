import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./ormconfig";
import { UserModule } from "./users/users.module";
import { BoardModule } from "./boards/boars.module";
import { TaskModule } from "./tasks/tasks.module";
import { LoginModule } from "./login/login.module";


@Module({
imports: [TypeOrmModule.forRoot(config),
    UserModule,
    BoardModule,
    TaskModule,
    LoginModule
],
  
})
export class AppModule {}