const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTaskById,
} = require('../../common/DB_in_memory');

const getAll = async (boardId) => {
  const tasks = await getTasks(boardId);
  return tasks;
};

const get = async (boardId, taskid) => {
  const task = await getTask(boardId, taskid);
  return task;
};

const create = async (boardId, data) => {
  const task = await createTask(boardId, data);
  return task;
};

const update = async (boardId, taskId, data) => {
  const task = await updateTask(boardId, taskId, data);
  return task;
};

const deleteTask = async (boardId, taskId) => {
  await deleteTaskById(boardId, taskId);
};

module.exports = { getAll, get, create, update, deleteTask };
