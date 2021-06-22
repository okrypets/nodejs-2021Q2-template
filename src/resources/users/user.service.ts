import usersRepo from './user.repository';
import { IUser, User } from "../../entities/User.entity" // "./user.model";
import { ErrorHandler } from '../../middleware/errorHandlerMiddleware';

/**
 * This function return result of run getAll()
 * @returns {function(): Array.<User>} all users from DB
 */
const getAll = async (): Promise<User[]> => usersRepo.getAll();

/**
 * This function return result of run get()
 * @param {string} id user id
 * @returns {function(string): User} Found User
 */
const get = async (id: string): Promise<User|null> => {
    const user = await usersRepo.get(id);
    if (user === null) {
        throw new ErrorHandler(404, `User with id: ${id} not found`);
      } 
    return user;
}

/**
 * This function return result of run create()
 * @param {User} data User instance
 * @returns {function(User): User} created User
 */
const create = async (data: IUser): Promise<User> => usersRepo.create(data);

/**
 * This function return result of run update()
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} userId user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {function(string, object.<string, user>): User} Updated User
 */
const update = async (userId: string, data: Omit<IUser, "id">): Promise<IUser|null> => {
    const user = await usersRepo.update(userId, data);;
    if (user === null) {
        throw new ErrorHandler(404, `User with id: ${userId} not found`);
      } 
    return user;  
}

/**
 * This function return result of run deleteUser()
 * @param {string} userId
 * @returns {function(string): number} index that has User in DB
 */
const deleteUser = async (userId: string): Promise<void> => {
    const index = await usersRepo.deleteUser(userId);
    if (index === -1) {
        throw new ErrorHandler(404, `User with id: ${userId} not found`);
    }
}

export default { getAll, get, create, update, deleteUser };
