const { v4 } = require('uuid');

/**
 * class Board
 * @class
 */
class Board {
  /**
   * Constructor of class Board
   * @constructor
   * @typedef {{id: string, title: string, columns: Array.<column>}} board
   * @typedef {{id: string, title: string, order: number}} column
   * @param {object.<string, board>} object with Task data
   */
  constructor({ id = v4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({ ...column, id: v4() }));
  }

  /**
   * static method that return Board instance
   * @param {Board} board Board instance
   * @returns {Board} board instatnce
   */
  static toResponse(board) {
    return board;
  }

  /**
   * This method update Board data with new data.
   * @param {object.<string, bpard>} newdata object with keys and value to update Board data by keys
   */
  update(newdata) {
    if (newdata.title) this.title = newdata.title;
    if (newdata.columns) this.columns = newdata.columns;
  }
}

module.exports = Board;
