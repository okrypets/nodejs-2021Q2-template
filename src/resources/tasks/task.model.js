const { v4 } = require('uuid');

class Task {
  constructor({
    id = v4(),
    title = 'TASK',
    order = 0,
    description = 'Task about',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return task;
  }

  update(newdata) {
    if (newdata.title) this.title = newdata.title;
    if (newdata.order) this.order = newdata.order;
    if (newdata.description) this.description = newdata.description;
    if (newdata.userId || newdata.userId === null) this.userId = newdata.userId;
    if (newdata.boardId) this.boardId = newdata.boardId;
    if (newdata.columnId) this.columnId = newdata.columnId;
  }
}

module.exports = Task;
