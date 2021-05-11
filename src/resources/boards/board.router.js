const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.get(req.params.boardId);
  res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(201);
  res.json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.update(req.params.boardId, req.body);
  res.json(Board.toResponse(board));
});

router.route('/:boardId').delete(async (req, res) => {
  await boardsService.deleteBoard(req.params.boardId);
  res.json('The board has been deleted');
});

module.exports = router;
