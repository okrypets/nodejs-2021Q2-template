import tasksRepo from './task.memory.repository';
import Task, { ITask, IUpdateTaskData } from './task.model';


/**
 * This function return result of run getAll()
 * @param {string} boardId board id
 * @returns {function(string): Array.<Task>} Return all Tasks from DB to be assigned to boardId
 */
const getAllByBoardId = async (boardId: string): Promise<ITask[]> => tasksRepo.getAll(boardId);

/**
 * This function return result of run get()
 * @param {string} boardId board id
 * @param {string} taskid task id
 * @returns {function(string, string): Task|boolean} Task by Id and task id or false if board not find
 */
const get = async (boardId: string, taskid: string): Promise<ITask> => tasksRepo.get(boardId, taskid);

/**
 * This function return result of run create()
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {function(string, Task): Task} created Task
 */
const create = async (boardId: string, data: Task): Promise<ITask> => tasksRepo.create(boardId, data);

/**
 * This function return result of run update()
 * @typedef {{title: string, order: number, description: string, userId: string, boardId: string, columnId: string}} task
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data object with keys and value to update Task data by keys
 * @returns {function(string, string, object.<string, task>): Task} updated Task instance
 */
const update = async(boardId: string, taskId: string, data: IUpdateTaskData): Promise<ITask> => tasksRepo.update(boardId, taskId, data);

/**
 *This function return result of run deleteTask()
 * @param {string} boardId  board id
 * @param {string} taskId task id
 * @returns {function(string, string): number} index that has Task in DB
 */
const deleteTask = async (boardId: string, taskId: string): Promise<void> => tasksRepo.deleteTask(boardId, taskId);

export default {
  getAllByBoardId,
  get,
  create,
  update,
  deleteTask,
};
