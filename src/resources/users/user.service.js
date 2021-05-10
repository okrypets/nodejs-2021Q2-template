const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const create = (userData) => usersRepo.create(userData);

const update = (userId, userData) => usersRepo.update(userId, userData);

const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, get, create, update, deleteUser };
