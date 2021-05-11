const { v4 } = require('uuid');

class Board {
  constructor({ id = v4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }

  update(newdata) {
    if (newdata.title) this.title = newdata.title;
    if (newdata.columns) this.columns = newdata.columns;
  }
}

module.exports = Board;
