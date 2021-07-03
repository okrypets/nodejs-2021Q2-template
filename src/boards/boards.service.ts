import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/Board.entity';
import { TaskService }  from "../tasks/tasks.service"

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepositary: Repository<Board>,
    private readonly taskRepositary: TaskService,
  ){}
  getAll = async(): Promise<Board[]> => this.boardRepositary.find();

  get = async (id?: string): Promise<Board | null> => {
    const board = await this.boardRepositary.findOne(id);
    if (board === undefined) return null;
    return board
  }

  create = async (data: Board): Promise<Board> => {
    const newBoard = this.boardRepositary.create(data);
    const savedBoard = await this.boardRepositary.save(newBoard);
    return savedBoard;
  }

  update = async (
    id: string,
    data: Partial<Board>
  ): Promise<Board | null> => {
    const board = this.boardRepositary.findOne(id);
    if (board === undefined) return null;
    const updatedBoard = await this.boardRepositary.update(id, data);
    return updatedBoard.raw 
  }

  deleteBoard = async (id: string): Promise<number> => {
    const res = await this.boardRepositary.findOne(id)
    if (res === undefined || id === undefined) return -1

    await this.taskRepositary.deleteAllTasksByBoardId(id)
    const board = await this.boardRepositary.delete(id);
    if (board.affected) {
        return 1;
    }
    return -1 
  }
}