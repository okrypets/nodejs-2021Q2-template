const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const create = (data) => usersRepo.create(data);

const update = (userId, data) => usersRepo.update(userId, data);

const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, get, create, update, deleteUser };
