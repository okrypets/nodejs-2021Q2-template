import {Request, Response, NextFunction} from 'express'
import express = require('express');
import { requestLogger } from '../../middleware/index';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router({mergeParams: true});

router.route('/').all(requestLogger).get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const tasks = await tasksService.getAllByBoardId(boardId);
      res.json(tasks.map(Task.toResponse));
    }    
  } catch (error) {
    next(error)
  }  
});

router.route('/:taskId').all(requestLogger).get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await tasksService.get(boardId, taskId);
      res.json(Task.toResponse(task));
    } 
  } catch (error) {
    next(error)
  }  
});

router.route('/').all(requestLogger).post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const task = await tasksService.create(boardId, req.body);
      res.status(201).json(Task.toResponse(task));
    } 
  } catch (error) {
    next(error)
  }  
});

router.route('/:taskId').all(requestLogger).put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await tasksService.update(boardId, taskId, req.body);
      res.json(Task.toResponse(task));
    } 
  } catch (error) {
    next(error)
  } 
});

router.route('/:taskId').all(requestLogger).delete(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      await tasksService.deleteTask(boardId, taskId);
      res.status(204).json('The task has been deleted');
    } 
  } catch (error) {
    next(error)
  } 
});

export default router;
