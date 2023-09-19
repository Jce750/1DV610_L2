import { MatrixSizeRowsCols } from './MatrixSizeRowsCols'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'
import { Cell } from './Cell'
import { PositionRowColumn } from './PositionRowColumn'
import { MatrixAnalyzer } from './MatrixAnalyzer'
import { RangeMinMax } from './RangeMinMax'
import { Limits } from './Limits'

export class GameBoard{

  #matrixSize:MatrixSizeRowsCols
  #cellSize:CellSizeWidthHeight
  #gameBoardElement:HTMLElement = document.createElement('div')

  constructor(rows:number,columns:number){
    new RangeMinMax(1, Limits.MaxRows).checkValueInRange(rows)
    new RangeMinMax(1,Limits.MaxColumns).checkValueInRange(columns)
    this.#matrixSize = new MatrixSizeRowsCols(rows,columns)
    this.#cellSize = new CellSizeWidthHeight(10,10)
    this.#gameBoardElement = this.#createGameBoardElement()
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

  test(test:string):void{
    console.log(test)
  }

  #createGameBoardElement():HTMLElement {
    const gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('gameboard')
    for (let row = 1; row <= this.#matrixSize.rowsSize; row++) {
      gameBoardElement.appendChild(this.#createRowOfCells(row))
    }
    return gameBoardElement
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
    return cell
  }

  addclickEventToCells(cellElements:NodeListOf<Element>, onclick: (event: MouseEvent) => void):void {
    if (typeof onclick !== 'function') {
      throw new Error('onclick must be a function')
    }
    for (const cellElement of cellElements) {
      if (!(cellElement instanceof HTMLElement)) {
        throw new Error('cell must be an HTMLElement')
      }
    cellElement.addEventListener('click', onclick)
    }
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





