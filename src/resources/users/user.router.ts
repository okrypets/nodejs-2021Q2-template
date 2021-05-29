import {Request, Response, NextFunction} from 'express'
import express = require('express');
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_: Request, res: Response) => {
  const users = await usersService.getAll();
  if (users instanceof Array) {
    res.json(users.map(User.toResponse));
  }  
});

router.route('/:userId').get(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["userId"] && typeof req.params["userId"] === "string") {
    const { userId } = req.params
    if (userId) {
      const user = await usersService.get(userId);
      if (!user || typeof user === "boolean") {
        res.status(404).json('User not found');
      } else res.json(User.toResponse(user));
    }
  } else next()  
});

router.route('/').post(async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);
  res.status(201);
  res.json(User.toResponse(user));
});

router.route('/:userId').put(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["userId"] && typeof req.params["userId"] === "string") {
    const user = await usersService.update(req.params["userId"], req.body);
    if (typeof user !== "boolean") res.json(User.toResponse(user));
  } else next();
  
});

router.route('/:userId').delete(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.params["userId"] && typeof req.params["userId"] === "string") {
    const userIndex = await usersService.deleteUser(req.params["userId"]);
    if (userIndex === -1) {
      res.status(404);
      res.json('User not found');
    } else res.status(204).json('The user has been deleted');
  } else next()
  
});

module.exports = router;