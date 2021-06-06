import usersRepo from './user.memory.repository';
import { IUser, IUpdateUserData } from "./user.model";

/**
 * This function return result of run getAll()
 * @returns {function(): Array.<User>} all users from DB
 */
const getAll = async (): Promise<IUser[]> => usersRepo.getAll();

/**
 * This function return result of run get()
 * @param {string} id user id
 * @returns {function(string): User} Found User
 */
const get = async (id: string): Promise<IUser | boolean> => usersRepo.get(id);

/**
 * This function return result of run create()
 * @param {User} data User instance
 * @returns {function(User): User} created User
 */
const create = async (data: IUser): Promise<IUser> => usersRepo.create(data);

/**
 * This function return result of run update()
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} userId user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {function(string, object.<string, user>): User} Updated User
 */
const update = async (userId: string, data: IUpdateUserData): Promise<IUser |  boolean> => usersRepo.update(userId, data);

/**
 * This function return result of run deleteUser()
 * @param {string} userId
 * @returns {function(string): number} index that has User in DB
 */
const deleteUser = async (userId: string): Promise<number> => usersRepo.deleteUser(userId);

export default { getAll, get, create, update, deleteUser };
