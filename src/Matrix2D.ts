import { Cell } from "./Cell"
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { Point2D } from "./Point2D"
import { PositionRowColumn } from "./PositionRowColumn"
import { ValidatorMatrix } from "./ValidatorMatrix"

/**
 * A class to represent a 2D matrix of cells.
 *
 */
export class Matrix2D {
  #size:MatrixSizeRowsCols = new MatrixSizeRowsCols()
  #cells:Cell[] = []

  constructor(size:MatrixSizeRowsCols) {
    this.size = size

  }

  get size() {
    return this.#size
  }

  set size(newSize:MatrixSizeRowsCols) {
    this.#size = newSize
  }

  addCell(cell:Cell) {
    this.#cells.push(cell)
  }

  getCellAtPosition(position: Point2D): Cell {
    new ValidatorMatrix().checkPositionExistInMatrix(position, this.#size);
    const foundCell = this.#cells.find(cell =>
      cell.position.row === position.y && cell.position.column === position.x
    );
    if (!foundCell) {
      throw new Error('Cell not found');
    }
    return foundCell;
  }

  #getCellByRowColumn(row:number, column:number):Cell {
    const cell = this.#cells.find(cell => cell.position.row === row && cell.position.column === column)
    if (!cell) {
      throw new Error('cell not found')
    }
    return cell
  }

}