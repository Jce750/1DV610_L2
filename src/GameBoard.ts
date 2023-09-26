import { MatrixSizeRowsCols } from './MatrixSizeRowsCols.js'
import { CellSizeWidthHeight } from './CellSizeWidthHeight.js'
import { Cell } from './Cell.js'
import { PositionRowColumn } from './PositionRowColumn.js'
import { MatrixAnalyzer } from './MatrixAnalyzer.js'
import { RangeMinMax } from './RangeMinMax.js'
import { Limits } from './Limits.js'

/**
 * The GameBoard class is where the public API for the game board is defined.
 * No need to interact with other classes directly.
 * See readme for further information.
 */
export class GameBoard{

  #matrixSize:MatrixSizeRowsCols
  #cellSize:CellSizeWidthHeight
  #gameBoardElement:HTMLElement = document.createElement('div')
  #cells:Cell[] = []

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
    new RangeMinMax(Limits.MinRows, Limits.MaxRows).checkValueInRange(rows)
    new RangeMinMax(Limits.MinColumns,Limits.MaxColumns).checkValueInRange(columns)
    this.#matrixSize = new MatrixSizeRowsCols(rows,columns)
    this.#cellSize = new CellSizeWidthHeight(10,10)
    this.#createGameBoard()
  }

  /**
   * Once created the game board cannot be resized in terms of rows and columns.
   * 1-based indexing is used for rows and columns.
   *
   * @readonly
   * @memberof GameBoard
   * @returns {MatrixSizeRowsCols} {rowsSize: number, columnsSize: number}
   */
  get size():MatrixSizeRowsCols{
    return this.#matrixSize
  }

  /**
   * Returns the current cell size. Also note that the cell size can be adjusted.
   * The validation is rudimentary, leaving it up to the caller
   * to ensure that the cell size is suitable for the implementation.
   *
   * @memberof GameBoard
   * @param {number} width - The width of the cell in pixels
   * @param {number} height - The height of the cell in pixels
   * @returns {CellSizeWidthHeight} {width: number, height: number}
   */
  get cellSize():CellSizeWidthHeight{
    return this.#cellSize
  }

  /**
   * Returns the HTML-element representing the gameboard.
   *
   * @readonly
   * @memberof GameBoard
   * @returns {HTMLElement}
   */
  get element():HTMLElement{
    return this.#gameBoardElement
  }

  get cellElements():NodeListOf<Element>{
    return this.#gameBoardElement.querySelectorAll('.cell')
  }

  /**
   * Returns a single HTMLelement representation of a cell at a row and column.
   * 1-based indexing is used for rows and columns.
   *
   * @param {number} row - The row of the cell
   * @param {number} col - The column of the cell
   * @returns {HTMLElement}
   * @memberof GameBoard
   * @throws {Error} - If row or column is out of range
   * @throws {Error} - If element is not found
   */
  getCellElementRowCol(row:number,col:number):HTMLElement{
    if (row < 1 || row > this.#matrixSize.rowsSize || col < 1 || col > this.#matrixSize.columnsSize) {
      throw new Error('row or column out of range')
    }
    let element = this.#gameBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if(!element){
      throw new Error('element not found')
    }
    return element as HTMLElement
  }

  /**
   * Return the html inner text value of a cell at a row and column.
   * 1-based indexing is used for rows and columns.
   *
   * @param {number} row - The row of the cell
   * @param {number} col - The column of the cell
   * @returns {string} - The inner text value of the cell
   * @memberof GameBoard
   * @throws {Error} - If row or column is out of range
   * @throws {Error} - If element is not found
   */
  getCellElementValueRowCol(row:number,col:number):string{
    return this.getCellElementRowCol(row,col).innerText
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
  addClickEventToCells(cells:Cell[], onclick: ((event: MouseEvent) => void)):void {
    for (const cell of cells) {
      if (!this.#isCellOnBoard(cell)) {
        throw new Error('cell must be on board')
      }
    }
    if (typeof onclick !== 'function') {
      throw new Error('onclick must be a function')
    }
    for (const cell of cells) {
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
   * Using this will change the size of all the cells on the game board.
   * The validation is rudimentary, leaving it up to the caller
   * to ensure that the cell size is suitable for the implementation.
   *
   * @param {number} width - The width of the cell in pixels
   * @param {number} height - The height of the cell in pixels
   * @memberof GameBoard
   * @throws {Error} - If width or height is not a positive integer
   * @throws {Error} - If width or height is not a finite number
   * @throws {Error} - If width or height is not a number
   */
  updateCellWidthHeight(width:number,height:number):void {
      for(const cell of this.#gameBoardElement.querySelectorAll('.cell')) {
        (cell as HTMLElement).style.width = `${width}px` as string
        (cell as HTMLElement).style.height = `${height}px` as string
      }
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
  getLongestCellLineOfValueMatchIntersectingCell(currentCell:HTMLElement):HTMLElement[]{
    if (!this.#isCellElementOnBoard(currentCell)) {
      return []
    }
    const mxa = new MatrixAnalyzer(this)
    return mxa.getLongestMatchingLineIntersectingCell(currentCell)
  }

  #isCellElementOnBoard(cellElement:HTMLElement):boolean {
    for (const cell of this.#cells) {
      if (cell.CellElement === cellElement) {
        return true
      }
    }
    return false
  }

  #createGameBoard():void {
    const gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('gameboard')
    for (let row = 1; row <= this.#matrixSize.rowsSize; row++) {
      gameBoardElement.appendChild(this.#createRowOfCells(row))
    }
    this.#gameBoardElement = gameBoardElement
  }

  #getCellbyRowColumn(row:number, column:number):Cell {
    const cell = this.#cells.find(cell => cell.position.row === row && cell.position.column === column)
    if (!cell) {
      throw new Error('cell not found')
    }
    return cell
  }

  #createRowOfCells (row:number):HTMLElement {
    const rowElement = document.createElement('div')
    for (let col = 1; col <= this.#matrixSize.columnsSize; col++) {
      const cell = this.#createCell(new PositionRowColumn(row,col))
      rowElement.appendChild(cell.CellElement)
    }
    return rowElement
  }

  #createCell(position: PositionRowColumn):Cell {
    const cell = new Cell(position,this.#cellSize)
    this.#cells.push(cell)
    return cell
  }

  #isCellOnBoard(cell:Cell):boolean {
    return this.isRowColumnOnBoard(cell.position.row, cell.position.column)
  }
}





