import { PositionRowColumn } from './PositionRowColumn'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'

export class Cell {
  #position: PositionRowColumn = new PositionRowColumn(1,1)
  #cellSize: CellSizeWidthHeight = new CellSizeWidthHeight(10,10)
  #cellElement: HTMLElement = document.createElement('div')

  constructor(position: PositionRowColumn, cellSize: CellSizeWidthHeight){
    this.position = position
    this.cellSize = cellSize
    this.#cellElement = this.#createCell()
  }

  get position():PositionRowColumn{
    return this.#position
  }

  get cellSize():CellSizeWidthHeight{
    return this.#cellSize
  }

  get CellElement():HTMLElement{
    return this.#cellElement
  }

  set position(position:PositionRowColumn){
    this.#position = position
  }

  set cellSize(cellSize:CellSizeWidthHeight){
    this.#cellSize = cellSize
  }

  #createCell():HTMLElement {
    const cell = document.createElement('div')
    cell.classList.add('cell') // Add a class for styling
    cell.setAttribute('data-col', this.#position.column.toString())
    cell.setAttribute('data-row', this.#position.row.toString())
    cell.style.width = `${this.#cellSize.width}px`
    cell.style.height = `${this.#cellSize.height}px`
    cell.innerText = ''
    return cell
  }
}

