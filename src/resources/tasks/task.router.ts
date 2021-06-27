import {Request, Response, NextFunction} from 'express'
import express = require('express');
import tasksService from './task.service';

const router = express.Router({mergeParams: true});

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const tasks = await tasksService.getAllByBoardId(boardId);
      if (tasks) res.json(tasks);
    }    
  } catch (error) {
    next(error)
  }  
});

router.route('/:taskId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await tasksService.get(boardId, taskId);
      if (task) res.json(task);
    } 
  } catch (error) {
    next(error)
  }  
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const task = await tasksService.create(boardId, req.body);
      res.status(201).json(task);
    }  
  } catch (error) {
    next(error)
  }  
  
});

router.route('/:taskId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId,  taskId } = req.params;
    if (boardId && taskId) {
      const task = await tasksService.update(boardId, taskId, req.body);
      if (task) res.json(task);
    } 
  } catch (error) {
    next(error)
  } 
});

router.route('/:taskId').delete(async (req: Request, res: Response, next: NextFunction) => {
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
