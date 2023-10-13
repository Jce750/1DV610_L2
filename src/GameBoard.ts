import { MatrixSizeRowsCols } from './MatrixSizeRowsCols'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'
import { Cell } from './Cell'
import { PositionRowColumn } from './PositionRowColumn'
import { MatrixAnalyzer } from './MatrixAnalyzer'
import { RangeMinMax } from './RangeMinMax'
import { MagicData } from './MagicData'
import { Point2D } from './Point2D'
import { Matrix2D } from './Matrix2D'

/**
 * The GameBoard class is where the public API for the game board is defined.
 * No need to interact with other classes directly.
 * See readme for further information.
 */
export class GameBoard{

  #cellSize:CellSizeWidthHeight
  #gameBoardElement:HTMLElement = document.createElement('div')
  #cells:Cell[] = []
  #gameBoard:Matrix2D

 /**
  * The constructor builds a game board with the specified number of rows and columns
  * Rows and columns will throw if not respecting the bounds of Limits.
  * CellSize is initialized to 10px width and height but can be adjusted.
  *
  * @param {number} rows - The number of rows in the game board
  * @param {number} columns - The number of columns in the game board
  * @memberof GameBoard
  */
  constructor(rows:number,columns:number){
    this.#gameBoard = new Matrix2D(new MatrixSizeRowsCols(rows,columns))
    this.#cellSize = new CellSizeWidthHeight(10,10)
  }


  /**
   * Use this to attach a click event to a specific range of cell elements.
   * The event handler passed as an argument is attached to each cell element.
   * 1-based indexing is used for rows and columns.
   *
   * @param {RangeMinMax} rowRange - The range of rows to attach the event to
   * @param {RangeMinMax} colRange - The range of columns to attach the event to
   * @param {((event: MouseEvent) => void)} onclick - The event handler is passed the event object as an argument
   * @memberof GameBoard
   * @throws {Error} - If cell is not in the range of the game board
   * @throws {Error} - If onclick is not a function
   */
  addClickEventToCells(positions: PositionRowColumn[], onclick: ((event: MouseEvent) => void)):void {
    let cellsToUpdate:Cell[] = [...this.#getCellsByArrayOfPositions(positions)]
    for (const cell of cellsToUpdate) {
      if (!this.#isCellOnBoard(cell)) {
        throw new Error('cell must be on board')
      }
    }
    if (typeof onclick !== 'function') {
      throw new Error('onclick must be a function')
    }
    for (const cell of cellsToUpdate) {
      cell.addClickEventListener(onclick)
    }
  }

  /**
   * To be implemented
   */
  removeClickEventFromCells(cellElements:NodeListOf<Element>):void {
    throw new Error('Not implemented')
  }

  /**
   * Use this to check if a cell position is on the game board.
   * 1-based indexing is used for rows and columns.
   *
   * @param {number} row - The row of the cell
   * @param {number} column - The column of the cell
   * @returns {boolean} - True if the cell is on the game board
   * @memberof GameBoard
   */
  isRowColumnOnBoard(row:number, column:number):boolean{
    return row >= 1 && row <= this.#matrixSize.rowsSize &&
      column >= 1 && column <= this.#matrixSize.columnsSize
  }



  /**
   * Looks along the horisontal, vertical and diagonal lines of the game board
   * for the longest line of coherent cells including the current cell
   * that match the value of the currentCell
   * The current cell is included in the returned array.
   *
   * @param {HTMLElement} currentCell - The cell to start the search from
   * @returns {HTMLElement[]} - An array of aligned HTMLElements with equal inner text values
   * @memberof GameBoard
   */
  getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D):Point2D[]{
    if (!this.#isCellElementOnBoard(currentCell)) {
      return []
    }
    
    return mxa.getLongestMatchingLineIntersectingCell(currentCell)
  }

  /**
   * Returns an array of positions for all the cells on the game board.
   * 1-based indexing is used for rows and columns.
   * @returns {PositionRowColumn[]} - An array of positions for all the cells on the game board
   * @memberof GameBoard
   */
  getAllPositionsOnBoardAsArray():PositionRowColumn[] {
    const positions:PositionRowColumn[] = []
    for (let row = 1; row <= this.#matrixSize.rowsSize; row++) {
      for (let column = 1; column <= this.#matrixSize.columnsSize; column++) {
        positions.push(new PositionRowColumn(row, column))
      }
    }
    return positions
  }

  #isCellElementOnBoard(cellElement:HTMLElement):boolean {
    for (const cell of this.#cells) {
      if (cell.CellElement === cellElement) {
        return true
      }
    }
    return false
  }



  // #isCellOnBoard(cell:Cell):boolean {
  //   return this.isRowColumnOnBoard(cell.position.row, cell.position.column)
  // }

}





