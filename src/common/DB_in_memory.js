const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  users: [],
  boards: [],
};

const getUsers = () => DB.users;

const getUser = (id) => {
  const filteredUser = DB.users.filter((user) => user.id === id);
  //   if (filteredUser.length > 0) {
  //     throw new Error();
  //   }
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
};

const getBoards = () => DB.boards;

const getBoard = (id) => {
  const filteredUser = DB.boards.filter((board) => board.id === id);
  return filteredUser[0];
};

const createBoard = (data) => {
  const newBoard = new Board({ ...data });
  DB.boards.push(newBoard);
  return newBoard;
};

const updateBoard = (id, data) => {
  const boardIndex = DB.boards.findIndex((board) => board.id === id);
  DB.boards[boardIndex].update(data);
  return DB.boards[boardIndex];
};

const deleteBoardById = (id) => {
  const boardIndex = DB.boards.findIndex((user) => user.id === id);
  DB.boards.splice(boardIndex, 1);
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
};
