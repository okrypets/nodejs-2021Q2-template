import { Get, Post, Put, Delete, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { BoardService } from './boards.service';

@Controller('/boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private readonly boardsService: BoardService) {}
  @Get()
  async getAll(@Req() _req: Request, @Res() res: Response): Promise<void> {
    const boards = await this.boardsService.getAll();
  res.json(boards); 
  }

  @Get('/:boardId')
  async get(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId } = req.params;
    if (boardId) {
        const board = await this.boardsService.get(boardId);
        if (board) res.json(board);
      } 
  }

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    const board = await this.boardsService.create(req.body);
  res.status(201).json(board);
  }

  @Put('/:boardId')
  async update(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId } = req.params;
    if (boardId) {
        const board = await this.boardsService.update(boardId, req.body);
        if (board) res.json(board);
      }
  }

  @Delete('/:boardId')
  async deleteBoard(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { boardId } = req.params;
    if (boardId) {
        await this.boardsService.deleteBoard(boardId);      
        res.status(204).json('The board has been deleted');      
      }    
  }
}