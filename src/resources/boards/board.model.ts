import { v4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export interface IColumn {
  id: string,
  title: string,
  order: number,
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
  update: (data: IUpdateBoardData) => void;
  toResponse?: (user: IBoard) =>IUpdateBoardData; 
}

export interface IUpdateBoardData {
  title?: string,
  columns?: IColumn[],
}

/**
 * class Board
 * @class
 */
@Entity({name: "board"})
class Board implements IBoard {
  @PrimaryGeneratedColumn()
  readonly id: string;
  @Column()
  title: string;
  @Column()
  columns: IColumn[];

  /**
   * Constructor of class Board
   * @constructor
   * @typedef {{title: string, columns: Array.<column>}} board
   * @typedef {{title: string, order: number}} column
   * @param {object.<string, board>} object with Task data
   */
  constructor({ id = v4(), title = 'Board', columns = [] }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({ ...column, id: v4() }));
  }

  /**
   * static method that return Board instance
   * @param {Board} board Board instance
   * @returns {Board} board instatnce
   */
  static toResponse(board: IBoard): IBoard {
    return board;
  }

  /**
   * This method update Board data with new data.
   * @param {object.<string, bpard>} newdata object with keys and value to update Board data by keys
   */
  update(newdata: IUpdateBoardData): void {
    if (newdata.title) this.title = newdata.title;
    if (newdata.columns) this.columns = newdata.columns;
  }
}

export default Board;
