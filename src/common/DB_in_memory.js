const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  users: [],
  boards: [],
  tasks: [],
};

/**
 * This function return an array with all Users in DB
 * @returns {Array.<User>} An array with all Users in DB.
 */
const getUsers = () => DB.users;

/**
 * This function find User in DB by id and return it
 * @param {string} id user id
 * @returns {User} Found User
 */
const getUser = (id) => {
  const filteredUser = DB.users.filter((user) => user.id === id);
  return filteredUser[0];
};

/**
 * This function create a new User in DB and return just created User
 * @param {User} data User instance
 * @returns {User} Created User
 */
const createUser = (data) => {
  const newUser = new User({ ...data });
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
const updateUser = (id, data) => {
  const userIndex = DB.users.findIndex((user) => user.id === id);
  DB.users[userIndex].update(data);
  return DB.users[userIndex];
};

/**
 * This function remove User by id from DB and return the index that the User had in the DB
 * and update all Tasks to be assigned to this User with userId: null
 * If returns index === -1 it meens that no User found by id
 * @param {string} id user id
 * @returns {number} Index that the User had in the DB
 */
const deleteUserById = (id) => {
  const userIndex = DB.users.findIndex((user) => user.id === id);

  DB.users.splice(userIndex, 1);
  DB.tasks.map((boardTasks) => {
    const tasks = boardTasks[1];
    tasks.map((it) => {
      if (it.userId === id) {
        it.update({ userId: null });
        return it;
      }
      return it;
    });
    return boardTasks;
  });

  return userIndex;
};

/**
 * This function return an array with all Boards in DB *
 * @returns {Array.<Board>} An Array with all Boards in DB.
 */
const getBoards = () => DB.boards;

/**
 * This function find Board in DB by id and return it
 * @param {string} id board id
 * @returns {Board} Found Board
 */
const getBoard = (id) => {
  const filteredBoard = DB.boards.filter((board) => board.id === id);
  return filteredBoard[0];
};

/**
 * This function creates a new Board in DB and create an empty array for tasks in DB to be assigned to the created Board by ID
 * and return just created Board.
 * @param {Board} data Board instance
 * @returns {Board} Created Board
 */
const createBoard = (data) => {
  const newBoard = new Board({ ...data });
  DB.boards.push(newBoard);
  DB.tasks.push([newBoard.id, []]);
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
const updateBoard = (id, data) => {
  const boardIndex = DB.boards.findIndex((board) => board.id === id);
  DB.boards[boardIndex].update(data);
  return DB.boards[boardIndex];
};

/**
 * This function remove Board from DB by ID and return the index that the Board had in the DB.
 * Also this function remove all tasks to be assigned to removed board
 * If returns index === -1 it meens that no User found by id
 * @param {string} id board id
 * @returns {number} index that the Board had in the DB.
 */
const deleteBoardById = (id) => {
  const boardIndex = DB.boards.findIndex((board) => board.id === id);
  if (boardIndex === -1) {
    return boardIndex;
  }
  DB.boards.splice(boardIndex, 1);
  const boardIndexInTasks = DB.tasks.findIndex((it) => it[0] === id);
  DB.tasks.splice(boardIndexInTasks, 1);

  return boardIndex;
};

/**
 * This function return an array with all Tasks in DB to be assinged to Board ID
 * @param {string} boardId board id
 * @returns {Array.<Task>} An Array with all Tasks in DB.
 */
const getTasks = (boardId) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) return [];
  return DB.tasks[boardIndex][1];
};

/**
 * This function find Task by board ID and task ID and return found Task or false if there is no borad with id === boardId
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @returns {Task|boolean} Found task or false if there is no borad with id === boardId
 */
const getTask = (boardId, taskId) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) {
    return false;
  }
  return DB.tasks[boardIndex][1].find((it) => it.id === taskId);
};

/**
 * This function create Task in DB and assined it to Board ID
 * @param {string} boardId board id
 * @param {Task} data Task instance
 * @returns {Task} Created Task
 */
const createTask = (boardId, data) => {
  const newTask = new Task({ ...data, boardId });
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  DB.tasks[boardIndex][1].push(newTask);
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
const updateTask = (boardId, taskId, data) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) {
    return false;
  }
  const taskIndex = DB.tasks[boardIndex][1].findIndex((it) => it.id === taskId);
  if (taskIndex === -1) {
    return false;
  }
  DB.tasks[boardIndex][1][taskIndex].update(data);
  return DB.tasks[boardIndex][1][taskIndex];
};

/**
 * This function remove Task assinged to the boardId from DB by taskId
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @returns {number} index that the Task had in the DB.
 */
const deleteTaskById = (boardId, taskId) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) {
    return boardIndex;
  }
  const taskIndex = DB.tasks[boardIndex][1].findIndex((it) => it.id === taskId);
  if (taskIndex === -1) {
    return taskIndex;
  }
  DB.tasks[boardIndex][1].splice(taskIndex, 1);
  return taskIndex;
};

module.exports = {
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
