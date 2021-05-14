const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoardId(boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.get(boardId, taskId);
  if (!task) {
    res.status(404).json('Task not found');
  } else res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  res.status(201).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.update(boardId, taskId, req.body);
  if (!task) {
    res.status(404).json('Task not found');
  } else res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const isOk = await tasksService.deleteTask(boardId, taskId);
  if (isOk === -1) {
    res.status(404).json('Task not found');
  } else res.status(204).json('The task has been deleted');
});

module.exports = router;
