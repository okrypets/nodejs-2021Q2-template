const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  users: [],
  boards: [],
  tasks: [],
};

const getUsers = () => DB.users;

const getUser = (id) => {
  const filteredUser = DB.users.filter((user) => user.id === id);
  return filteredUser[0];
};

const createUser = (data) => {
  const newUser = new User({ ...data });
  DB.users.push(newUser);
  return newUser;
};

const updateUser = (id, data) => {
  const userIndex = DB.users.findIndex((user) => user.id === id);
  DB.users[userIndex].update(data);
  return DB.users[userIndex];
};

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

const getBoards = () => DB.boards;

const getBoard = (id) => {
  const filteredUser = DB.boards.filter((board) => board.id === id);
  return filteredUser[0];
};

const createBoard = (data) => {
  const newBoard = new Board({ ...data });
  DB.boards.push(newBoard);
  DB.tasks.push([newBoard.id, []]);
  return newBoard;
};

const updateBoard = (id, data) => {
  const boardIndex = DB.boards.findIndex((board) => board.id === id);
  DB.boards[boardIndex].update(data);
  return DB.boards[boardIndex];
};

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

const getTasks = (boardId) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) return [];
  return DB.tasks[boardIndex][1];
};

const getTask = (boardId, taskId) => {
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  if (boardIndex === -1) {
    return false;
  }
  return DB.tasks[boardIndex][1].find((it) => it.id === taskId);
};

const createTask = (boardId, data) => {
  const newTask = new Task({ ...data, boardId });
  const boardIndex = DB.tasks.findIndex((it) => it[0] === boardId);
  DB.tasks[boardIndex][1].push(newTask);
  return newTask;
};

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
