import { CellSizeWidthHeight } from "./CellSizeWidthHeight"
import { MagicData } from "./MagicData"
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { Point2D } from "./Point2D"

export class GameBoardHtmlFactory {

  /**
   * Creates a game board HTML element with rows and columns.
   *
   * @param matrixSize The number of rows and columns in the game board. (1-based)
   * @param cellSize The width and height in pixels of each cell in the game board.
   * @returns A game board HTML element.
   */
  createGameBoardHTML(matrixSize:MatrixSizeRowsCols, cellSize:CellSizeWidthHeight):HTMLElement {
    const {rows} = matrixSize
    const gameBoardElement = document.createElement(MagicData.StringDiv)
    gameBoardElement.classList.add(MagicData.StringGameBoard)
    for (let y = 1; y <= rows; y++) {
      gameBoardElement.appendChild(this.#createRowOfHtmlElementCells(y, matrixSize, cellSize))
    }
    return gameBoardElement
  }

  /**
   * Creates a single cell HTML element at a point.
   *
   * @param point The point where the cell will be created. (1-based x=column, y=row)
   * @param cellSize The width and height in pixels of the cell.
   * @returns A cell HTML element.
   */
  createCellHtmlElement(point:Point2D, cellSize:CellSizeWidthHeight):HTMLElement {
    return this.#createHtmlElementCell(point, cellSize)
  }

  #createRowOfHtmlElementCells (y:number, matrixSize:MatrixSizeRowsCols, cellSize:CellSizeWidthHeight):HTMLElement {
    const {columns} = matrixSize
    const rowElement = document.createElement(MagicData.StringDiv)
    for (let x = 1; x <= columns; x++) {
      const htmlCell = this.#createHtmlElementCell(new Point2D(x, y), cellSize)
      rowElement.appendChild(htmlCell)
    }
    return rowElement
  }

  #createHtmlElementCell(point:Point2D, cellSize:CellSizeWidthHeight):HTMLElement {
    const {width, height} = cellSize
    const htmlCell = document.createElement(MagicData.StringDiv)
    htmlCell.classList.add(MagicData.StringCell) // Add a class for styling
    htmlCell.setAttribute(MagicData.HtmlCellColumn, point.x.toString())
    htmlCell.setAttribute(MagicData.HtmlCellRow, point.y.toString())
    htmlCell.style.width = `${width}px`
    htmlCell.style.height = `${height}px`
    htmlCell.innerText = ""
    return htmlCell
  }
}