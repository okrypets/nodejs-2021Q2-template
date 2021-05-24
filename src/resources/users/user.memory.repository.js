const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUserById,
} = require('../../common/DB_in_memory');

/**
 * This function run getUsers() and return all Users from DB
 * @returns {function(): Array.<User>} array of all Users
 */
const getAll = async () => getUsers();

/**
 * This function run getUser() and return User by id
 * @param {string} id user id
 * @returns {function(string): User} User instance
 */
const get = async (id) => getUser(id);

/**
 * this function run createUser() and create new User
 * @param {User} data User instance
 * @returns {function(User): User} created User
 */
const create = async (data) => createUser(data);

/**
 * This function run updateUser() and return updated User
 * @param {string} id user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {function(string, object.<string, user>): User} updated User
 */
const update = async (id, data) => updateUser(id, data);

/**
 * This function run deleteUserById() and return index that the User had in the DB
 * @param {string} id user id
 * @returns {function(string): number} index of removed User
 */
const deleteUser = async (id) => deleteUserById(id);

module.exports = { getAll, get, create, update, deleteUser };
