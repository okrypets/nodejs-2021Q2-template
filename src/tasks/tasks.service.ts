import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/Tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepositary: Repository<Task>
  ){}
  
    getAll = async (boardId: string): Promise<Task[]> => this.taskRepositary.find({where: {boardId: boardId }})
    
    get = async (boardId: string, taskId: string): Promise<Task|null> => {
        const task = await this.taskRepositary.findOne({where: {boardId: boardId, id: taskId}});
        if (task === undefined) return null;
        return task;
    };
    
    create = async (boardId: string, data: Omit<Task, "id">): Promise<Task> => {
        const newTask = this.taskRepositary.create({...data, boardId });
        const savedTask = await this.taskRepositary.save(newTask);
        return savedTask;
    };
    
    updateTask = async (boardId: string, taskId: string, data: Task): Promise<Task|null> => {
        const task = this.taskRepositary.findOne({where: {boardId: boardId, id: taskId}});
        if (task === undefined) return null;
        const updatedTask = await this.taskRepositary.update(taskId, data);
        return updatedTask.raw
    };

    update = async (taskId: string, data: Partial<Task>): Promise<Task|null> => {
        const updatedTask = await this.taskRepositary.update(taskId, data);
        return updatedTask.raw
    };
    
    deleteTask = async (boardId: string, taskId: string): Promise<number> => {
        const task = await this.taskRepositary.delete({boardId: boardId, id: taskId});
        if (task.affected) return 1;
        return -1 
    };

    deleteAllTasksByBoardId = async (boardId: string): Promise<number> => {
        const task = await this.taskRepositary.delete({boardId: boardId});
        if (task.affected) return 1;
        return -1 
    };
}