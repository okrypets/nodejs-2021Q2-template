import {Request, Response, NextFunction} from 'express';
import express = require('express');
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(it => {
      const { id, name, login } = it;
      return { id, name, login }
    }));
  } catch (error) {
    next(error)
  }    
});

router.route('/:userId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const user = await usersService.get(userId);
      if (user) {
        const { id, name, login } = user;
        res.json({ id, name, login });
      }      
    }
  } catch(error) { next(error)}  
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.create(req.body);
    if (user) {
      const { id, name, login } = user;
      res.status(201).json({ id, name, login });
    }
  } catch (error) {
    next(error)
  }   
});

router.route('/:userId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    if (userId) {
      const user = await usersService.update(userId, req.body);
      if (user) {
        const { id, name, login } = user;
        res.json({ id, name, login });
      }
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
