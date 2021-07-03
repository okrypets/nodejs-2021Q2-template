import { Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { TaskService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('/boards/:boardId/tasks')
export class TaskController {
  constructor(
    private readonly tasksService:TaskService
  ) {}
  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId } = req.params;
    if (boardId) {
        const tasks = await this.tasksService.getAll(boardId);
        if (tasks) res.json(tasks);
      } 
  }

  @Get('/:taskId')
  async getById(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await this.tasksService.get(boardId, taskId);
      if (task) res.json(task);
    } 
  }

  @Post('/')
  async createTask(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId } = req.params;
    if (boardId) {
      const task = await this.tasksService.create(boardId, req.body);
      res.status(201).json(task);
    } 
  }

  @Put('/:taskId')
  async updateTask(@Req() req: Request, @Res()  res: Response): Promise<void> {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await this.tasksService.updateTask(boardId, taskId, req.body);
      if (task) res.json(task);
    } 
  }

  @Delete('/:taskId')
  async deleteById(@Req() req: Request, @Res()  res: Response): Promise<void> {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      await this.tasksService.deleteTask(boardId, taskId);
      res.status(204).json('The task has been deleted');
    } 
  }
}