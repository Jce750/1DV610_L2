import { MatrixSizeRowsCols } from './MatrixSizeRowsCols.js'
import { CellSizeWidthHeight } from './CellSizeWidthHeight.js'
import { Cell } from './Cell.js'
import { PositionRowColumn } from './PositionRowColumn.js'
import { MatrixAnalyzer } from './MatrixAnalyzer.js'
import { RangeMinMax } from './RangeMinMax.js'
import { Limits } from './Limits.js'

export class GameBoard{

  #matrixSize:MatrixSizeRowsCols
  #cellSize:CellSizeWidthHeight
  #gameBoardElement:HTMLElement = document.createElement('div')
  #cells:Cell[] = []

  constructor(rows:number,columns:number){
    new RangeMinMax(Limits.MinRows, Limits.MaxRows).checkValueInRange(rows)
    new RangeMinMax(Limits.MinColumns,Limits.MaxColumns).checkValueInRange(columns)
    this.#matrixSize = new MatrixSizeRowsCols(rows,columns)
    this.#cellSize = new CellSizeWidthHeight(10,10)
    this.#createGameBoard()
  }

  get size():MatrixSizeRowsCols{
    return this.#matrixSize
  }

  get cellSize():CellSizeWidthHeight{
    return this.#cellSize
  }

  get element():HTMLElement{
    return this.#gameBoardElement
  }

  get cellElements():NodeListOf<Element>{
    return this.#gameBoardElement.querySelectorAll('.cell')
  }

  // Update Tests
  get allCells():Cell[]{
    return this.#cells
  }

  // TODO: Add Test for this method
  #getCellbyRowColumn(row:number, column:number):Cell {
    const cell = this.#cells.find(cell => cell.position.row === row && cell.position.column === column)
    if (!cell) {
      throw new Error('cell not found')
    }
    return cell
  }

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

  getCellElementValueRowCol(row:number,col:number):string{
    return this.getCellElementRowCol(row,col).innerText
  }

  // TODO Update tests (not returning element)
  // TODO Update tests Adding cell to cells
  #createGameBoard():void {
    const gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('gameboard')
    for (let row = 1; row <= this.#matrixSize.rowsSize; row++) {
      gameBoardElement.appendChild(this.#createRowOfCells(row))
    }
    this.#gameBoardElement = gameBoardElement
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

  removeClickEventFromCells(cellElements:NodeListOf<Element>):void {
    throw new Error('Not implemented')
  }

  #isCellOnBoard(cell:Cell):boolean {
    return this.isRowColumnOnBoard(cell.position.row, cell.position.column)
  }

  isRowColumnOnBoard(row:number, column:number):boolean{
    return row >= 1 && row <= this.#matrixSize.rowsSize &&
      column >= 1 && column <= this.#matrixSize.columnsSize
  }

  updateCellWidthHeight(width:number,height:number):void {
    for(const cell of this.#gameBoardElement.querySelectorAll('.cell')) {
      (cell as HTMLElement).style.width = `${width}px` as string
      (cell as HTMLElement).style.height = `${height}px` as string
    }
  }

  getLongestCellLineOfValueMatchIntersectingCell(currentCell:HTMLElement):HTMLElement[]{
    const mxa = new MatrixAnalyzer(this)
    return mxa.getLongestMatchingLineIntersectingCell(currentCell)
  }
}





