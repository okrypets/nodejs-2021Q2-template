const { v4 } = require('uuid');

class Board {
  constructor({ id = v4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({ ...column, id: v4() }));
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
