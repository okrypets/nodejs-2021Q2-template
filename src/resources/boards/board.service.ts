import boardsRepo from './board.memory.repository';
import { IBoard, IUpdateBoardData } from "./board.model"

/**
 * This function return result of getAll()
 * @returns {function(): Array.<Board>}  return all Boards from DB
 */
const getAll = async (): Promise<IBoard[]> => boardsRepo.getAll();

/**
 * This function return result of get()
 * @param {string} id board id
 * @returns {function(string):Board} return Board instance
 */
const get = async (id: string): Promise<IBoard> => boardsRepo.get(id);

/**
 * This function return result of create()
 * @param {Board} data
 * @returns {function(Board): Board} return creates Board
 */
const create = async (data: IBoard): Promise<IBoard> => boardsRepo.create(data);

/**
 * This function return result of update()
 * @typedef {{title: string, columns: Array.<column>}} board
 * @typedef {{title: string, order: number}} column
 * @param {string} id board id
 * @param {object.<string, board>} data object with keys and value to update Task data by keys
 * @returns {function(string, object.<string, board>): Board} Updated Board instance
 */
const update = async (id: string, data: IUpdateBoardData): Promise<IBoard> => boardsRepo.update(id, data);

/**
 * This function return result of deleteBoard()
 * @param {string} id board id
 * @returns {number} index that has Board in DB
 */
const deleteBoard = async (id: string): Promise<void> => boardsRepo.deleteBoard(id);

export default { getAll, get, create, update, deleteBoard };
