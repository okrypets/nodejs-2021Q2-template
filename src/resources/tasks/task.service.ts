import tasksRepo from './task.memory.repository';
import Task, { ITask, IUpdateTaskData } from './task.model';
import { ErrorHandler } from '../../middleware/errorHandlerMiddleware';

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
const get = async (boardId: string, taskId: string): Promise<ITask|null> => {
  const task = await tasksRepo.get(boardId, taskId);
  if (!task) {
    throw new ErrorHandler(404, `Task with id: ${taskId} not found`);
  }
  return task
}

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
const update = async(boardId: string, taskId: string, data: IUpdateTaskData): Promise<ITask|null> => {
  const task = await tasksRepo.update(boardId, taskId, data);
  if (!task) {
    throw new ErrorHandler(404, `Task with id: ${taskId} not found`);
  }
  return task
}

/**
 *This function return result of run deleteTask()
 * @param {string} boardId  board id
 * @param {string} taskId task id
 * @returns {function(string, string): number} index that has Task in DB
 */
const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
  const index = await tasksRepo.deleteTask(boardId, taskId);
  if (index === -1) {
    throw new ErrorHandler(404, `Task with id: ${taskId} not found`);
  }
}

export default {
  getAllByBoardId,
  get,
  create,
  update,
  deleteTask,
};
