import User, { IUser, IUpdateUserData } from '../resources/users/user.model';
import Board, { IBoard, IUpdateBoardData } from '../resources/boards/board.model';
import Task, { ITask, IUpdateTaskData } from '../resources/tasks/task.model';

const DBUsers: IUser[] = [];
const DBTasks: ITask[] = [];
const DBoards: IBoard[] = [];


const DB = {
  users: DBUsers,
  boards: DBoards,
  tasks: DBTasks,
};

/**
 * This function return an array with all Users in DB
 * @returns {Array.<User>} An array with all Users in DB.
 */
export const getUsers = (): IUser[] => DB.users;

/**
 * This function find User in DB by id and return it
 * @param {string} id user id
 * @returns {User} Found User
 */
export const getUser = (id:string): IUser | boolean => {
  const user = DB.users.find((it: IUser) => it.id === id);
  if (!user) {
    return false;
  } 
  return user;
};

/**
 * This function create a new User in DB and return just created User
 * @param {User} data User instance
 * @returns {User} Created User
 */
export const createUser = (data: IUser): IUser => {
  const newUser:IUser = new User(data);
  DB.users.push(newUser);
  return newUser;
};

/**
 * This function find User in DB by id and update the data those passed in data param and return updated User
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} id user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {User} Updated User
 */
export const updateUser = (id: string, data: IUpdateUserData): IUser | boolean => {
  const user = getUser(id);
  if (typeof user !== "boolean" && user.update) {
    user.update(data);
    const updatedUser = getUser(id);
    return updatedUser;
  } 
  return false
};

/**
 * This function remove User by id from DB and return the index that the User had in the DB
 * and update all Tasks to be assigned to this User with userId: null
 * If returns index === -1 it meens that no User found by id
 * @param {string} id user id
 * @returns {number} Index that the User had in the DB
 */
export const deleteUserById = (id: string): number => {
  const userIndex = DB.users.findIndex((user: IUser) => user.id === id);
if (userIndex === -1) return userIndex;

  DB.users.splice(userIndex, 1);
  DB.tasks.map((task: ITask) => {
    if (task.userId === id && task.update) {
      task.update({ userId: null });
    }
    return task;
  });

  return userIndex;
};

/**
 * This function return an array with all Boards in DB *
 * @returns {Array.<Board>} An Array with all Boards in DB.
 */
export const getBoards = (): IBoard[] => DB.boards;

/**
 * This function find Board in DB by id and return it
 * @param {string} id board id
 * @returns {Board} Found Board
 */
export const getBoard = (id: string): IBoard | boolean => {
  const board = DB.boards.find((it: IBoard) => it.id === id);
  if (!board) {
    return false;
  } 
  return board;
};

/**
 * This function creates a new Board in DB and create an empty array for tasks in DB to be assigned to the created Board by ID
 * and return just created Board.
 * @param {Board} data Board instance
 * @returns {Board} Created Board
 */
export const createBoard = (data: IBoard): IBoard => {
  const newBoard: IBoard = new Board({ ...data });
  DB.boards.push(newBoard);
  return newBoard;
};

/**
 * This function find Board in DB by id and update the data those passed in data param and return updated Board
 * @typedef {{title: string, columns: Array.<column>}} board
 * @typedef {{title: string, order: number}} column
 * @param {string} id board id
 * @param {object.<string, board>} data object with keys and value to update Board data by keys
 * @returns {Board} Updated Board
 */
export const updateBoard = (id: string, data: IUpdateBoardData): IBoard | boolean => {
  const board = getBoard(id);
  if (typeof board !== "boolean" && board.update) {
    board.update(data);
    const updatedBoard = getBoard(id);
    return updatedBoard;
  } return false
};

/**
 * This function remove Board from DB by ID and return the index that the Board had in the DB.
 * Also this function remove all tasks to be assigned to removed board
 * If returns index === -1 it meens that no User found by id
 * @param {string} id board id
 * @returns {number} index that the Board had in the DB.
 */
export const deleteBoardById = (id: string): number => {
  const boardIndex = DB.boards.findIndex((board: IBoard) => board.id === id);
  if (boardIndex === -1) {
    return boardIndex;
  }
  DB.boards.splice(boardIndex, 1);
  const boardIndexInTasks = DB.tasks.findIndex((it:ITask) => it.boardId === id);
  DB.tasks.splice(boardIndexInTasks, 1);

  return boardIndex;
};

const getTasksByBoardId = (id: string): ITask[] => DB.tasks.filter((task:ITask) => task.boardId === id)

/**
 * This function return an array with all Tasks in DB to be assinged to Board ID
 * @param {string} boardId board id
 * @returns {Array.<Task>} An Array with all Tasks in DB.
 */
export const getTasks = (boardId: string): ITask[] => getTasksByBoardId(boardId)


/**
 * This function find Task by board ID and task ID and return found Task or false if there is no borad with id === boardId
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @returns {Task|boolean} Found task or false if there is no borad with id === boardId
 */
export const getTask = (boardId: string, taskId: string): ITask | boolean => {
  const tasksByBoardId = getTasksByBoardId(boardId);
  const task = tasksByBoardId.find((it:ITask) => it.id === taskId);
  if (!task) return false
  return task;
};

/**
 * This function create Task in DB and assined it to Board ID
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {Task} Created Task
 */
export const createTask = (boardId: string, data: ITask): ITask => {
  const newTask:ITask = new Task({ ...data, boardId });
  DB.tasks.push(newTask);
  return newTask;
};

/**
 * This function find Task by task ID and assined to the Board by boardId, update the data those passed in data param and return updated Board
 * or return false if there is no Task found
 * @typedef {{title: string, order: number, description: string, userId: string, boardId: string, columnId: string}} task
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @param {object.<string, task>} data object with keys and value to update Task data by keys
 * @returns {Task|boolean} return updated Board or false if there is no Task found
 */
export const updateTask = (boardId: string, taskId: string, data: IUpdateTaskData): ITask | boolean => {
  const task = getTask(boardId, taskId)
  if (!task || typeof task === "boolean") {
    return false;
  } 
  // const taskIndex = DB.tasks.findIndex((task:ITask) => task.id === taskId)
  if (task.update ) task.update(data);
  const updatedTask = getTask(boardId, taskId)
  return updatedTask;
};

/**
 * This function remove Task assinged to the boardId from DB by taskId
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @returns {number} index that the Task had in the DB.
 */
export const deleteTaskById = (boardId: string, taskId: string): number => {
  const taskIndex = DB.tasks.findIndex((task:ITask) => task.id === taskId && task.boardId === boardId)
  
  if (taskIndex === -1) {
    return taskIndex;
  }
  DB.tasks.splice(taskIndex, 1);
  return taskIndex;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUserById,
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoardById,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTaskById,
};
