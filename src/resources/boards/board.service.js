const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const create = (data) => boardsRepo.create(data);

const update = (id, data) => boardsRepo.update(id, data);

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, get, create, update, deleteBoard };
