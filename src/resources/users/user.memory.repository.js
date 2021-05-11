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

const create = async (data) => {
  const user = await createUser(data);
  return user;
};

const update = async (id, data) => {
  const user = await updateUser(id, data);
  return user;
};

const deleteUser = async (id) => {
  await deleteUserById(id);
};

module.exports = { getAll, get, create, update, deleteUser };
