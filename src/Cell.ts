import { PositionRowColumn } from './PositionRowColumn'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'

export class Cell {
  #position: PositionRowColumn = new PositionRowColumn(1,1)
  #cellSize: CellSizeWidthHeight = new CellSizeWidthHeight(10,10)
  #value: string = ''
  #cellElement: HTMLElement = document.createElement('div')
  #eventHandler: (event: MouseEvent) => void = (event: MouseEvent) => {}

  constructor(position: PositionRowColumn, cellSize?: CellSizeWidthHeight){
    this.#position = position
    if(cellSize) {
      this.#cellSize = cellSize
    }
    this.#cellElement = this.#createHtmlCell()
  }

  get value():string{
    return this.#cellElement.innerText
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

  get eventHandler():(event: MouseEvent) => void{
    return this.#eventHandler
  }

  set value(value:string){
    this.#cellElement.innerText = value
  }

  set position(position:PositionRowColumn){
    this.#position = position
  }

  set cellSize(cellSize:CellSizeWidthHeight){
    this.#cellSize = cellSize
  }

  set eventHandler(eventHandler:(event: MouseEvent) => void){
    this.#eventHandler = eventHandler
  }

  #createHtmlCell():HTMLElement {
    const htmlCell = document.createElement('div')
    htmlCell.classList.add('cell') // Add a class for styling
    htmlCell.setAttribute('data-col', this.#position.column.toString())
    htmlCell.setAttribute('data-row', this.#position.row.toString())
    htmlCell.style.width = `${this.#cellSize.width}px`
    htmlCell.style.height = `${this.#cellSize.height}px`
    htmlCell.innerText = this.#value
    return htmlCell
  }

  createCellFromHtmlCellElement(cellElement:HTMLElement):Cell{
    const row = Number(cellElement.dataset.row)
    const column = Number(cellElement.dataset.col)
    const position = new PositionRowColumn(row, column)
    const cellSize = new CellSizeWidthHeight(cellElement.offsetWidth, cellElement.offsetHeight)
    return new Cell(position, cellSize)
  }

  addClickEventListener(onclick: ((event: MouseEvent) => void)):void{
    this.#cellElement.addEventListener('click', onclick)
    this.#eventHandler = onclick
  }

  removeClickEventListener():void{
    this.#cellElement.removeEventListener('click', this.#eventHandler)
  }

}
