const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = (boardId) => tasksRepo.getAll(boardId);

const get = (boardId, taskid) => tasksRepo.get(boardId, taskid);

const create = (boardId, data) => tasksRepo.create(boardId, data);

const update = (boardId, taskId, data) =>
  tasksRepo.update(boardId, taskId, data);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getAllByBoardId,
  get,
  create,
  update,
  deleteTask,
};
