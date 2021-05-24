const tasksRepo = require('./task.memory.repository');

/**
 * This function return result of run getAll()
 * @param {string} boardId board id
 * @returns {function(string): Array.<Task>} Return all Tasks from DB to be assigned to boardId
 */
const getAllByBoardId = (boardId) => tasksRepo.getAll(boardId);

/**
 * This function return result of run get()
 * @param {string} boardId board id
 * @param {string} taskid task id
 * @returns {function(string, string): Task|boolean} Task by Id and task id or false if board not find
 */
const get = (boardId, taskid) => tasksRepo.get(boardId, taskid);

/**
 * This function return result of run create()
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {function(string, Task): Task} created Task
 */
const create = (boardId, data) => tasksRepo.create(boardId, data);

/**
 * This function return result of run update()
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data object with keys and value to update Task data by keys
 * @returns {function(string, string, object.<string, task>): Task} updated Task instance
 */
const update = (boardId, taskId, data) =>
  tasksRepo.update(boardId, taskId, data);

/**
 *This function return result of run deleteTask()
 * @param {string} boardId  board id
 * @param {string} taskId task id
 * @returns {function(string, string): number} index that has Task in DB
 */
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getAllByBoardId,
  get,
  create,
  update,
  deleteTask,
};
