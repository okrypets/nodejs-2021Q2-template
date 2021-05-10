const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUserById,
} = require('../../common/DB_in_memory');

const getAll = async () => {
  const users = await getUsers();
  return users;
};

const get = async (id) => {
  const user = await getUser(id);
  return user;
};

const create = async (userData) => {
  const user = await createUser(userData);
  return user;
};

const update = async (id, userData) => {
  const user = await updateUser(id, userData);
  return user;
};

const deleteUser = async (id) => {
  await deleteUserById(id);
};

module.exports = { getAll, get, create, update, deleteUser };
