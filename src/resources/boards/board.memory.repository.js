const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoardById,
} = require('../../common/DB_in_memory');

const getAll = async () => {
  const boards = await getBoards();
  return boards;
};

const get = async (id) => {
  const board = await getBoard(id);
  return board;
};

const create = async (data) => {
  const board = await createBoard(data);
  return board;
};

const update = async (id, data) => {
  const board = await updateBoard(id, data);
  return board;
};

const deleteBoard = async (id) => {
  await deleteBoardById(id);
};

module.exports = { getAll, get, create, update, deleteBoard };
