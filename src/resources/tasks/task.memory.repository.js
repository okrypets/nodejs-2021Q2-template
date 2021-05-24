const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTaskById,
} = require('../../common/DB_in_memory');

/**
 * This function run getTasks() and return all Tasks from DB
 * @param {string} boardId board id
 * @returns {function(string): Array.<Task>} array with all Tasks assigned to boardId
 */
const getAll = async (boardId) => getTasks(boardId);

/**
 * This function run getTask() and return Task from DB by board id and task id
 * @param {string} boardId board id
 * @param {string} taskid task id
 * @returns {function(string, string): Task} Found Task
 */
const get = async (boardId, taskid) => getTask(boardId, taskid);

/**
 * This function run createTask() and return crated Task
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {function(string, Task): Task} created Task
 */
const create = async (boardId, data) => createTask(boardId, data);

/**
 * This function run updateTask() and return updated Task
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data
 * @returns {function(string, string, object.<string, task>): Task} updated Task instance
 */
const update = async (boardId, taskId, data) =>
  updateTask(boardId, taskId, data);

/**
 * This function run deleteTaskById() and return Task index in DB
 * @param {string} boardId board id
 * @param {*} taskId task id
 * @returns {function(string, string): number} index of Task in DB before delete
 */
const deleteTask = async (boardId, taskId) => deleteTaskById(boardId, taskId);

module.exports = { getAll, get, create, update, deleteTask };
