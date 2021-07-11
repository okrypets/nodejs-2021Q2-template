import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from "src/tasks/tasks.module";
import { Board } from "../entities/Board.entity";
import { BoardController } from "./boards.controller";
import { BoardService } from "./boards.service";


@Module({
    imports: [TypeOrmModule.forFeature([Board]), TaskModule],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule{}