import { getTasks, getTask, createTask, updateTask, deleteTaskById } from '../../common/DB_in_memory';
import { ITask, IUpdateTaskData } from "./task.model"

/**
 * This function run getTasks() and return all Tasks from DB
 * @param {string} boardId board id
 * @returns {Promise.<Array.<Task>>} Promise which resolved with array with all Tasks assigned to boardId
 */
const getAll = (boardId: string): ITask[] => getTasks(boardId);

/**
 * This function run getTask() and return Task from DB by board id and task id
 * @param {string} boardId board id
 * @param {string} taskid task id
 * @returns {Promise.<Task>} Promise which resolved with found Task
 */
const get = async (boardId: string, taskid: string): Promise<ITask|null> => getTask(boardId, taskid);

/**
 * This function run createTask() and return crated Task
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {Promise.<Task>} Promise which resolved with created Task
 */
const create = (boardId: string, data: ITask): ITask => createTask(boardId, data);

/**
 * This function run updateTask() and return updated Task
 * @typedef {{title: string, order: number, description: string, userId: string, boardId: string, columnId: string}} task
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data
 * @returns {Promise.<Task>} Promise which resolved with updated Task instance
 */
const update = async (boardId: string, taskId: string, data: IUpdateTaskData): Promise<ITask|null> =>
  updateTask(boardId, taskId, data);

/**
 * This function run deleteTaskById() and return Task index in DB
 * @param {string} boardId board id
 * @param {*} taskId task id
 * @returns {Promise.<number>} Promise which resolved with index of Task in DB before delete
 */
const deleteTask = async (boardId: string, taskId: string): Promise<number> => deleteTaskById(boardId, taskId);

export default { getAll, get, create, update, deleteTask };
