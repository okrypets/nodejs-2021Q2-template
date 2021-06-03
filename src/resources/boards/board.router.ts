import {Request, Response, NextFunction} from 'express'
import express = require('express');
import { logger } from '../../middleware/logger';
import Board from './board.model';
import boardsService from './board.service';

const router = express.Router({mergeParams: true});

router.route('/').all(logger).get(async (_: Request, res: Response) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').all(logger).get(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && typeof req.params["boardId"] === "string") {
    const board = await boardsService.get(req.params["boardId"]);
    if (!board || typeof board === "boolean") {
      res.status(404).json('Board not found');
    } else res.json(Board.toResponse(board));
  } else next()
}); 

router.route('/').all(logger).post(async (req: Request, res: Response) => {
  const board = await boardsService.create(req.body);
  res.status(201).json(Board.toResponse(board));
});

router.route('/:boardId').all(logger).put(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && typeof req.params["boardId"] === "string") {
    const board = await boardsService.update(req.params["boardId"], req.body);
    if (typeof board !== "boolean")  res.json(Board.toResponse(board));
  } else next()
  
});

router.route('/:boardId').all(logger).delete(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["boardId"] && typeof req.params["boardId"] === "string") {
    const boardIndex = await boardsService.deleteBoard(req.params["boardId"]);
    if (boardIndex === -1) {
      res.status(404).json('Board not found');
    } else res.status(204).json('The board has been deleted');
  } else next()
  
});

export default router;
