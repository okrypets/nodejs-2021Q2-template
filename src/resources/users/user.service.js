const usersRepo = require('./user.memory.repository');

/**
 * This function return result of run getAll()
 * @returns {function(): Array.<User>} all users from DB
 */
const getAll = () => usersRepo.getAll();

/**
 * This function return result of run get()
 * @param {string} id user id
 * @returns {function(string): User} Found User
 */
const get = (id) => usersRepo.get(id);

/**
 * This function return result of run create()
 * @param {User} data User instance
 * @returns {function(User): User} created User
 */
const create = (data) => usersRepo.create(data);

/**
 * This function return result of run update()
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} userId user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {function(string, object.<string, user>): User} Updated User
 */
const update = (userId, data) => usersRepo.update(userId, data);

/**
 * This function return result of run deleteUser()
 * @param {string} userId
 * @returns {function(string): number} index that has User in DB
 */
const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, get, create, update, deleteUser };
