import {Request, Response, NextFunction} from 'express'
import express = require('express');
import { requestLogger } from '../../middleware/index';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router({mergeParams: true});

router.route('/').all(requestLogger).get(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && typeof req.params["boardId"] === "string") {
    const { boardId } = req.params;
    const tasks = await tasksService.getAllByBoardId(boardId);
    res.json(tasks.map(Task.toResponse));
  } else next()
  
});

router.route('/:taskId').all(requestLogger).get(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && req.params["taskId"] && typeof req.params["boardId"] === "string" && typeof req.params["taskId"] === "string") {
    const { boardId, taskId } = req.params;
    const task = await tasksService.get(boardId, taskId);
    if (!task || typeof task === "boolean") {
      res.status(404).json('Task not found');
    } else res.json(Task.toResponse(task));
  } else next()
  
});

router.route('/').all(requestLogger).post(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && typeof req.params["boardId"] === "string") {
    const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  res.status(201).json(Task.toResponse(task));
  } else next()
  
});

router.route('/:taskId').all(requestLogger).put(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && req.params["taskId"] && typeof req.params["boardId"] === "string" && typeof req.params["taskId"] === "string") {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update(boardId, taskId, req.body);
    if (!task) {
      res.status(404).json('Task not found');
    } else if (typeof task !== "boolean" ) res.json(Task.toResponse(task));
  } else next()
 
});

router.route('/:taskId').all(requestLogger).delete(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && req.params["taskId"] && typeof req.params["boardId"] === "string" && typeof req.params["taskId"] === "string") {
    const { boardId, taskId } = req.params;
  const isOk = await tasksService.deleteTask(boardId, taskId);
  if (isOk === -1) {
    res.status(404).json('Task not found');
  } else res.status(204).json('The task has been deleted');
  } else next()  
});

export default router;
