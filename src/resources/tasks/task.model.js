const { v4 } = require('uuid');

/**
 * class Task
 * @class
 */
class Task {
  /**
   * Constuctor of class Task
   * @constructor
   * @typedef {{id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string}} task
   * @param {object.<string, task>} object with Task data
   */
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

  /**
   * statuc method that return Task instance
   * @param {Task} task Task instance
   * @returns {Task} Task instance
   */
  static toResponse(task) {
    return task;
  }

  /**
   * This method update Task data with new data.
   * @param {object.<string, task>} newdata object with keys and value to update Task data by keys
   */
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
