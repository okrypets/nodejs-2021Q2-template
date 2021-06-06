import { getUsers, getUser, createUser, updateUser, deleteUserById } from '../../common/DB_in_memory';
import { IUser, IUpdateUserData } from "./user.model"

/**
 * This function run getUsers() and return all Users from DB
 * @returns {Promise.<Array.<User>>} Promise which resolved with array of all Users
 */
const getAll = async (): Promise<IUser[]> => getUsers();

/**
 * This function run getUser() and return User by id
 * @param {string} id user id
 * @returns {Promise.<User>} Promise which resolved with user instance
 */
const get = async (id: string): Promise<IUser | boolean> => getUser(id);

/**
 * this function run createUser() and create new User
 * @param {User} data User instance
 * @returns {Promise.<User>} Promise which resolved with created User
 */
const create = async (data: IUser): Promise<IUser> => createUser(data);

/**
 * This function run updateUser() and return updated User
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} id user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {Promise.<User>} Promise which resolved with updated User
 */
const update = async (id: string, data: IUpdateUserData): Promise<IUser | boolean> => updateUser(id, data);

/**
 * This function run deleteUserById() and return index that the User had in the DB
 * @param {string} id user id
 * @returns {Promise.<number>} Promise which resolved with index of removed User
 */
const deleteUser = async (id: string): Promise<number> => deleteUserById(id);

export default { getAll, get, create, update, deleteUser };
