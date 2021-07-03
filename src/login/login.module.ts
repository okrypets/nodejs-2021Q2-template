import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/User.entity";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";



@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService]
})
export class LoginModule{}