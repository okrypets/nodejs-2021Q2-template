import { getRepository } from "typeorm";
// import { getUsers, getUser, createUser, updateUser, deleteUserById } from '../../common/DB_in_memory';
import User, { IUser, IUpdateUserData } from "./user.model"

/**
 * This function run getUsers() and return all Users from DB
 * @returns {Promise.<Array.<User>>} Promise which resolved with array of all Users
 */
// const getAll = (): IUser[] => getUsers();
const getAll = async (): Promise<User[]> => {
    const userRepositary = getRepository(User)
    return userRepositary.find({where: {}})
}

/**
 * This function run getUser() and return User by id
 * @param {string} id user id
 * @returns {Promise.<User>} Promise which resolved with user instance
 */
// const get = async (id: string): Promise<IUser|null> => getUser(id);
const get = async (id: string): Promise<User|null> => {
    const userRepositary = getRepository(User)
    const user = await userRepositary.findOne(id);
    if (user === undefined) return null;
    return user
};

/**
 * this function run createUser() and create new User
 * @param {User} data User instance
 * @returns {Promise.<User>} Promise which resolved with created User
 */
// const create = (data: IUser): IUser => createUser(data);
const create = async (data: IUser): Promise<User> => {
    const userRepositary = getRepository(User)
    const newUser = userRepositary.create(data);
    const savedUser = await userRepositary.save(newUser);
    return savedUser;
};

/**
 * This function run updateUser() and return updated User
 * @typedef {{name: string, login: string, password: string}} user
 * @param {string} id user id
 * @param {object.<string, user>} data object with keys and value to update User data by keys
 * @returns {Promise.<User>} Promise which resolved with updated User
 */
// const update = async (id: string, data: IUpdateUserData): Promise<IUser|null> => updateUser(id, data);
const update = async (id: string, data: IUpdateUserData): Promise<IUser|null> => {
    const userRepositary = getRepository(User)
    const user = userRepositary.findOne(id);
    if (user === undefined) return null;
    const updatedUser = await userRepositary.update(id, data);
    return updatedUser.raw
};

/**
 * This function run deleteUserById() and return index that the User had in the DB
 * @param {string} id user id
 * @returns {Promise.<number>} Promise which resolved with index of removed User
 */
// const deleteUser = async (id: string): Promise<number> => deleteUserById(id);
const deleteUser = async (id: string): Promise<number> => {
    const userRepositary = getRepository(User)
    const user = await userRepositary.delete(id);
    if (user.affected) return 1;
    return -1 
};

export default { getAll, get, create, update, deleteUser };
