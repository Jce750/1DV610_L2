import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { PositionRowColumn } from "./PositionRowColumn"
import { IHtmlGameBoardFacade } from "./IHtmlGameBoardFacade"
import { PointSelectionComposite } from "./PointSelectionComposite"
import { Point2D } from "./Point2D"
import { MagicData } from "./MagicData"
import { Matrix2D } from "./Matrix2D"

export class HtmlGameBoardActions implements IHtmlGameBoardFacade {

    /**
   * Returns a single HTMLelement representation of a cell at a row and column from the collection.
   * 1-based indexing is used for rows and columns.
   *
   * @param {number} row - The row of the cell
   * @param {number} col - The column of the cell
   * @returns {HTMLElement}
   * @memberof GameBoard
   * @throws {Error} - If row or column is out of range
   * @throws {Error} - If element is not found
   */
    getCellElementAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):HTMLElement{
      const {row, column} = position
      const {rows, columns} = this.#getGameBoardElementRowsColumns(gameBoardElement)
      if (row < 1 || row > rows || column < 1 || column > columns) {
        throw new Error('row or column out of range')
      }
      let element = gameBoardElement.querySelector(`[data-row="${row}"][data-col="${column}"]`)
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
  getCellHtmlElementValueAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):string{
    return this.#getCellHtmlElementAtPosition(position, gameBoardElement).innerText
  }

  /**
   * Get the html element of a cell at a row and column.
   * 1-based indexing is used for rows and columns.
   */
  #getCellHtmlElementAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):HTMLElement{
    const { row, column } = position;
    const allCellElements = gameBoardElement.querySelectorAll(MagicData.HtmlCellSelector);
    const firstMatchingCell = Array.from(allCellElements).find(cellElement =>
     this.#isMatchingCell(cellElement, row, column)
    );
    if (firstMatchingCell) {
      return firstMatchingCell as HTMLElement;
    }
    throw new Error('Cell not found');
  }

  #isMatchingCell(cellElement: Element, row: number, column: number): boolean {
    return cellElement.getAttribute(MagicData.HtmlCellColumn) === column.toString() &&
      cellElement.getAttribute(MagicData.HtmlCellRow) === row.toString()
  }


  #getGameBoardElementRowsColumns(gameBoardElement:HTMLElement):MatrixSizeRowsCols{
    const nodeListCells:NodeListOf<Element> = this.#getAllHtmlElementCells(gameBoardElement)
    const cells = [...nodeListCells] as HTMLElement[]
    const rows = cells.filter(cell => cell.getAttribute('data-row') === '1')
    const columns = cells.filter(cell => cell.getAttribute('data-col') === '1')
    return new MatrixSizeRowsCols(rows.length,columns.length)
  }

  #getAllHtmlElementCells(gameBoardElement:HTMLElement):NodeListOf<Element>{
    return gameBoardElement.querySelectorAll('.cell')
  }

  addClickEventToHtmlElementCells(selection:PointSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    selection.forEach((point:Point2D) => {
      const {x,y} = point
      const position = new PositionRowColumn(y,x)
      const cellElement = this.#getCellHtmlElementAtPosition(position, gameBoardHtmlElement)
      this.addClickEventToCell(cellElement, onclick)
    })
  }

  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void {
    if (typeof onclick !== 'function') {
      throw new Error('onclick must be a function')
    }
    cellElement.addEventListener('click', onclick)
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
  updateHtmlMatrixByMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    matrix.cells.forEach(cell => {
      const cellElement = this.#getCellHtmlElementAtPosition(cell.position, htmlMatrix)
      cellElement.innerText = cell.value.toString()
      cellElement.style.width = `${cell.cellSize.width}px`
      cellElement.style.height = `${cell.cellSize.height}px`
    })
  }
}