import { CellSizeWidthHeight } from "./CellSizeWidthHeight"
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { PositionRowColumn } from "./PositionRowColumn"

export class GameBoardHtmlFactory {
  createGameBoardHTML(matrixSize:MatrixSizeRowsCols, cellSize:CellSizeWidthHeight):HTMLElement {
    const {rows} = matrixSize
    const gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('gameboard')
    for (let row = 1; row <= rows; row++) {
      gameBoardElement.appendChild(this.#createRowOfHtmlElementCells(row, matrixSize, cellSize))
    }
    return gameBoardElement
  }

  #createRowOfHtmlElementCells (row:number, matrixSize:MatrixSizeRowsCols, cellSize:CellSizeWidthHeight):HTMLElement {
    const {columns} = matrixSize
    const rowElement = document.createElement('div')
    for (let col = 1; col <= columns; col++) {
      const htmlCell = this.#createHtmlElementCell(new PositionRowColumn(row,col), cellSize)
      rowElement.appendChild(htmlCell)
    }
    return rowElement
  }

  #createHtmlElementCell(position:PositionRowColumn, cellSize:CellSizeWidthHeight):HTMLElement {
    const {width, height} = cellSize
    const {row, column} = position
    const htmlCell = document.createElement('div')
    htmlCell.classList.add('cell') // Add a class for styling
    htmlCell.setAttribute('data-col', column.toString())
    htmlCell.setAttribute('data-row', row.toString())
    htmlCell.style.width = `${width}px`
    htmlCell.style.height = `${height}px`
    htmlCell.innerText = ""
    return htmlCell
  }
}