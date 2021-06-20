// import { getTasks, getTask, createTask, updateTask, deleteTaskById } from '../../common/DB_in_memory';
import Task, { ITask, IUpdateTaskData } from "./task.model";
import { getRepository } from "typeorm";

/**
 * This function run getTasks() and return all Tasks from DB
 * @param {string} boardId board id
 * @returns {Promise.<Array.<Task>>} Promise which resolved with array with all Tasks assigned to boardId
 */
// const getAll = (boardId: string): ITask[] => getTasks(boardId);
const getAll = async (boardId: string): Promise<Task[]> => {
  const taskRepositary = getRepository(Task);
  return taskRepositary.find({ where: { boardId: boardId }})
}

/**
 * This function run getTask() and return Task from DB by board id and task id
 * @param {string} boardId board id
 * @param {string} taskid task id
 * @returns {Promise.<Task>} Promise which resolved with found Task
 */
// const get = async (boardId: string, taskid: string): Promise<ITask|null> => getTask(boardId, taskid);
const get = async (boardId: string, taskId: string): Promise<Task|null> => {
  const taskRepositary = getRepository(Task)
  const task = await taskRepositary.findOne({where: {boardId: boardId, id: taskId}});
  if (task === undefined) return null;
  return task;
};

/**
 * This function run createTask() and return crated Task
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {Promise.<Task>} Promise which resolved with created Task
 */
// const create = (boardId: string, data: ITask): ITask => createTask(boardId, data);
const create = async (_boardId: string, data: ITask): Promise<Task> => {
  const taskRepositary = getRepository(Task)
  const newTask = taskRepositary.create(data);
  const savedTask = await taskRepositary.save(newTask);
  return savedTask;
};

/**
 * This function run updateTask() and return updated Task
 * @typedef {{title: string, order: number, description: string, userId: string, boardId: string, columnId: string}} task
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data
 * @returns {Promise.<Task>} Promise which resolved with updated Task instance
 */
// const update = async (boardId: string, taskId: string, data: IUpdateTaskData): Promise<ITask|null> =>
//   updateTask(boardId, taskId, data);
const update = async (boardId: string, taskId: string, data: IUpdateTaskData): Promise<ITask|null> => {
  const taskRepositary = getRepository(Task)
  const task = taskRepositary.findOne({where: {boardId: boardId, id: taskId}});
  if (task === undefined) return null;
  const updatedTask = await taskRepositary.update(taskId, data);
  return updatedTask.raw
};


/**
 * This function run deleteTaskById() and return Task index in DB
 * @param {string} boardId board id
 * @param {*} taskId task id
 * @returns {Promise.<number>} Promise which resolved with index of Task in DB before delete
 */
// const deleteTask = async (boardId: string, taskId: string): Promise<number> => deleteTaskById(boardId, taskId);
const deleteTask = async (boardId: string, taskId: string): Promise<number> => {
  const taskRepositary = getRepository(Task)
    const task = await taskRepositary.delete({boardId: boardId, id: taskId});
    if (task.affected) return 1;
    return -1 
};

export default { getAll, get, create, update, deleteTask };
