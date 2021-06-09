import {Request, Response, NextFunction} from 'express';
import express = require('express');
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (error) {
    next(error)
  }    
});

router.route('/:userId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const user = await usersService.get(userId);
      if (user) res.json(User.toResponse(user));      
    }
  } catch(error) { next(error)}  
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(User.toResponse(user));
  } catch (error) {
    next(error)
  }   
});

router.route('/:userId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    if (userId) {
      const user = await usersService.update(userId, req.body);
      if (user)  res.json(User.toResponse(user));
    }    
  } catch (error) {
  next(error)
  }  
});

router.route('/:userId').delete(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    if (userId) {
      await usersService.deleteUser(userId);
      res.status(204).json('The user has been deleted');      
    }    
  } catch (error) {
    next(error)
    }
});

export default router;
