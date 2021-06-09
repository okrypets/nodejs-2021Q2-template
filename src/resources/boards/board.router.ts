import {Request, Response, NextFunction} from 'express'
import express = require('express');
import Board from './board.model';
import boardsService from './board.service';

const router = express.Router({mergeParams: true});

router.route('/').get(async (_: Request, res: Response, next: NextFunction) => {
  try {
    const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse)); 
  } catch (error) {
    next(error)
  }
});

router.route('/:boardId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const board = await boardsService.get(boardId);
      if (board) res.json(Board.toResponse(board));
    }    
  } catch (error) {
    next(error)
  }
}); 

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await boardsService.create(req.body);
  res.status(201).json(Board.toResponse(board));   
  } catch (error) {
    next(error)
  }
});

router.route('/:boardId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      const board = await boardsService.update(boardId, req.body);
      if (board) res.json(Board.toResponse(board));
    }    
  } catch (error) {
    next(error)
  }  
});

router.route('/:boardId').delete(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    if (boardId) {
      await boardsService.deleteBoard(boardId);      
      res.status(204).json('The board has been deleted');      
    }    
  } catch (error) {
    next(error)
  }  
});

export default router;
