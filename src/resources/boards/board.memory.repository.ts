// import { getBoards, getBoard, createBoard, updateBoard, deleteBoardById } from '../../common/DB_in_memory';
import Board, { IBoard, IUpdateBoardData } from "./board.model"
import { getRepository } from "typeorm";

/**
 * This function run getBoards() and return all Boards from DB
 * @returns {Promise.<Array.<Board>>}  Promise which resolved with all Boards from DB
 */
// const getAll = (): IBoard[] => getBoards();
const getAll = async (): Promise<Board[]> => {
const boardRepository = getRepository(Board)
return boardRepository.find({where: {}})
};

/**
 * This function run getBoard() and return Board instance
 * @param {string} id board id
 * @returns {Promise.<Board>} Promise which resolved with Board instance
 */
// const get = async (id: string): Promise<IBoard|null> => getBoard(id);
const get = async (id: string): Promise<IBoard|null> => {
    const boardRepositary = getRepository(Board)
    const board = await boardRepositary.findOne(id);
    if (board === undefined) return null;
    return board
};

/**
 * This function run createBoard() and return created Board
 * @param {Board} data
 * @returns {Promise.<Board>} Promise which resolved with creates Board instance
 */
// const create = (data: IBoard): IBoard => createBoard(data);
const create = async (data: IBoard): Promise<Board> =>  {
    const boardRepositary = getRepository(Board)
    const newBoard = boardRepositary.create(data);
    const savedBoard = await boardRepositary.save(newBoard);
    return savedBoard;
};

/**
 * This function run updateBoard() and return updated Board
 * @typedef {{title: string, columns: Array.<column>}} board
 * @typedef {{title: string, order: number}} column
 * @param {string} id board id
 * @param {object.<string, board>} data object with keys and value to update Task data by keys
 * @returns {Promise.<Board>} Promise which resolved with updated Board instance
 */
// const update = async (id: string, data: IUpdateBoardData): Promise<IBoard|null> => updateBoard(id, data);
const update = async (id: string, data: IUpdateBoardData): Promise<IBoard|null> => {
    const boardRepositary = getRepository(Board)
    const board = boardRepositary.findOne(id);
    if (board === undefined) return null;
    const updatedBoard = await boardRepositary.update(id, data);
    return updatedBoard.raw 
};

/**
 * This function run deleteBoardById() and return index of Board in DB
 * @param {string} id board id
 * @returns {Promise.<number>} Promise which resolved with index that has Board in DB
 */
// const deleteBoard = async (id: string): Promise<number> => deleteBoardById(id);
const deleteBoard = async (id: string): Promise<number> => {
    const boardRepositary = getRepository(Board)
    const board = await boardRepositary.delete(id);
    if (board.affected) return 1;
    return -1   
};

export default { getAll, get, create, update, deleteBoard };
