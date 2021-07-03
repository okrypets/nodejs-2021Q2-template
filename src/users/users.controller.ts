import { Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { UserService } from './users.service';

@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(
    private readonly usersService:UserService
  ){}
  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response): Promise<void> {
    const users = await this.usersService.getAll();
    res.status(200).send(users.map(it => {
        const { id, name, login } = it;
        return { id, name, login }
      }));
  }

  @Get('/:userId')
  async getById (@Req() req: Request, @Res() res: Response): Promise<void> {
    const { userId } = req.params;
    if (userId) {
      const user = await this.usersService.get(userId);
      if (user) {
        const { id, name, login } = user;
        res.json({ id, name, login });
      }      
    }
  }

  @Post('/')
  async createUser(@Req() req: Request,@Res()  res: Response): Promise<void> {
    const user = await this.usersService.create(req.body);
    if (user) {
      const { id, name, login } = user;
      res.status(201).json({ id, name, login });
    }
  }

  @Put('/:userId')
  async updateUser(@Req() req: Request,@Res()  res: Response): Promise<void> {
    const { userId } = req.params
    if (userId) {
      const user = await this.usersService.update(userId, req.body);
      if (user) {
        const { id, name, login } = user;
        res.json({ id, name, login });
      }
    }  
  }

  @Delete('/:userId')
  async deleteById(@Req() req: Request,@Res()  res: Response): Promise<void> {
    const { userId } = req.params
    if (userId) {
      await this.usersService.deleteUser(userId);
      res.status(204).json('The user has been deleted');      
    } 
  }
}