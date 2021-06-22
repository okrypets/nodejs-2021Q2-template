import boardsRepo from './board.memory.repository';
import { Board } from "../../entities/Board.entity"; 
import { ErrorHandler } from '../../middleware/errorHandlerMiddleware';

/**
 * This function return result of getAll()
 * @returns {function(): Array.<Board>}  return all Boards from DB
 */
const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

/**
 * This function return result of get()
 * @param {string} id board id
 * @returns {function(string):Board} return Board instance
 */
const get = async (id: string): Promise<Board|null> => {
    const board = await boardsRepo.get(id);
    if (!board) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`);
    }
    return board
}

/**
 * This function return result of create()
 * @param {Board} data
 * @returns {function(Board): Board} return creates Board
 */
const create = async (data: Omit<Board, "id">): Promise<Board> => boardsRepo.create(data);

/**
 * This function return result of update()
 * @typedef {{title: string, columns: Array.<column>}} board
 * @typedef {{title: string, order: number}} column
 * @param {string} id board id
 * @param {object.<string, board>} data object with keys and value to update Task data by keys
 * @returns {function(string, object.<string, board>): Board} Updated Board instance
 */
const update = async (id: string, data: Omit<Board, "id">): Promise<Board|null> => {
    const board = await boardsRepo.update(id, data);
    if (!board) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`);
    }
    return board
}

/**
 * This function return result of deleteBoard()
 * @param {string} id board id
 * @returns {number} index that has Board in DB
 */
const deleteBoard = async (id: string): Promise<void> => {
    const index = await boardsRepo.deleteBoard(id);
    if (index === -1) {
        throw new ErrorHandler(404, `Board with id: ${id} not found`);
    }  
}

export default { getAll, get, create, update, deleteBoard };
