const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoardById,
} = require('../../common/DB_in_memory');

/**
 * This function run getBoards() and return all Boards from DB
 * @returns {function(): Array.<Board>}  return all Boards from DB
 */
const getAll = async () => getBoards();

/**
 * This function run getBoard() and return Board instance
 * @param {string} id board id
 * @returns {function(string): Board} return Board instance
 */
const get = async (id) => getBoard(id);

/**
 * This function run createBoard() and return created Board
 * @param {Board} data
 * @returns {function(Board): Board} return creates Board instance
 */
const create = async (data) => createBoard(data);

/**
 * This function run updateBoard() and return updated Board
 * @param {string} id board id
 * @param {object.<string, board>} data object with keys and value to update Task data by keys
 * @returns {function(string, object.<string, board>): Board} Updated Board instance
 */
const update = async (id, data) => updateBoard(id, data);

/**
 * This function run deleteBoardById() and return index of Board in DB
 * @param {string} id board id
 * @returns {number} index that has Board in DB
 */
const deleteBoard = async (id) => deleteBoardById(id);

module.exports = { getAll, get, create, update, deleteBoard };
