const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

const regexp = /(?<=\/boards\/)(.*?)(?=\/tasks)/g;

router.route('/').get(async (req, res) => {
  const boardId = req.baseUrl.match(regexp)[0];
  const tasks = await tasksService.getAllByBoardId(boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  const boardId = req.baseUrl.match(regexp)[0];
  try {
    const task = await tasksService.get(boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (error) {
    if (error.message === 'Not found') {
      res.status(404);
      res.json('Task not found');
    }
  }
});

router.route('/').post(async (req, res) => {
  const boardId = req.baseUrl.match(regexp)[0];
  try {
    const task = await tasksService.create(boardId, req.body);
    res.status(201);
    res.json(Task.toResponse(task));
  } catch (error) {
    if (error.message === 'Bad request') {
      res.status(400);
      res.json('Bad request');
    }
  }
});

router.route('/:taskId').put(async (req, res) => {
  const boardId = req.baseUrl.match(regexp)[0];
  const task = await tasksService.update(boardId, req.params.taskId, req.body);
  res.json(Task.toResponse(task));
});

router.route('/:taskId').delete(async (req, res) => {
  const boardId = req.baseUrl.match(regexp)[0];

  try {
    await tasksService.deleteTask(boardId, req.params.taskId);
    res.status(204);
    res.json('The task has been deleted');
  } catch (error) {
    if (error.message === 'Not found') {
      res.status(404);
      res.json('Task not found');
    }
  }
});

module.exports = router;
