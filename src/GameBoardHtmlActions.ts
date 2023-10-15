import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { PositionRowColumn } from "./PositionRowColumn"
import { IHtmlGameBoardFacade } from "./IHtmlGameBoardFacade"
import { PointsSelectionComposite } from "./PointsSelectionComposite"
import { Point2D } from "./Point2D"
import { MagicData } from "./MagicData"
import { Matrix2D } from "./Matrix2D"
import { CellSizeWidthHeight } from "./CellSizeWidthHeight"
import { Matrix2DActions } from "./Matrix2DActions"
import { IMatrix2DFacade } from "./IMatrix2DFacade"
import { PointsSelectionNode } from "./PointsSelectionNode"

export class GameBoardHtmlActions implements IHtmlGameBoardFacade {

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
    getCellHtmlElementAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):HTMLElement{
      try {
        return this.#getCellHtmlElementAtPosition(position, gameBoardElement)
      } catch (error) {
        throw new Error('element not found')
      }
    }

    getCellHtmlElementAtPoint(point:Point2D, gameBoardElement:HTMLElement):HTMLElement{
      const position = new PositionRowColumn(point.y, point.x)
      return this.getCellHtmlElementAtPosition(position, gameBoardElement)
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
    return this.getCellHtmlElementAtPosition(position, gameBoardElement).innerText
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
    if (!firstMatchingCell) {
      throw new Error('element not found');
    }
    return firstMatchingCell as HTMLElement;
  }

  #isMatchingCell(cellElement: Element, row: number, column: number): boolean {
    return cellElement.getAttribute(MagicData.HtmlCellColumn) === column.toString() &&
      cellElement.getAttribute(MagicData.HtmlCellRow) === row.toString()
  }

  #getGameBoardElementRowsColumns(gameBoardElement:HTMLElement):MatrixSizeRowsCols{
    const nodeListCells:NodeListOf<Element> = this.#getAllHtmlElementCells(gameBoardElement)
    // Check if nodeListCells is empty
    if (nodeListCells.length === 0) {
      throw new Error('No cells found');
    }
    const cells = [...nodeListCells] as HTMLElement[]
    const uniqueRows = new Set<string>();
    const uniqueColumns = new Set<string>();
    cells.forEach(cell => {
      const rowName = cell.getAttribute(MagicData.HtmlCellRow);
      const columnName = cell.getAttribute(MagicData.HtmlCellColumn);
      if (rowName) {
        uniqueRows.add(rowName);
      }
      if (columnName) {
        uniqueColumns.add(columnName);
      }
    });
    return new MatrixSizeRowsCols(uniqueRows.size,uniqueColumns.size)
  }

  #getAllHtmlElementCells(gameBoardElement:HTMLElement):NodeListOf<Element>{
    console.log(gameBoardElement)
    console.log(MagicData.HtmlCellSelector)
    console.log('FFFFFFFFFFFFFFFFFFFFFFffF')
    return gameBoardElement.querySelectorAll(MagicData.HtmlCellSelector)
  }

  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
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

  selectAllCellsPointsInHtmlElement(gameBoardHtmlElement:HTMLElement):PointsSelectionComposite {
    const selection = new PointsSelectionNode(0,0)
    const {rows, columns} = this.#getGameBoardElementRowsColumns(gameBoardHtmlElement)
    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        selection.add(new Point2D(column, row))
      }
    }
    return selection
  }

  /**
  * To be implemented
  */
  removeClickEventFromCells(cellElements:NodeListOf<Element>):void {
    throw new Error('Not implemented')
  }

  /**
   * Update the html matrix with the values from the matrix.
   *
   */
  updateHtmlMatrixByMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    matrix.cells.forEach(cell => {
      const cellElement = this.#getCellHtmlElementAtPosition(cell.position, htmlMatrix)
      cellElement.innerText = cell.value.toString()
      cellElement.style.width = `${cell.size.width}px`
      cellElement.style.height = `${cell.size.height}px`
    })
  }

  updateMatrixByHtmlMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    matrix.cells.forEach(cell => {
      const cellElement = this.#getCellHtmlElementAtPosition(cell.position, htmlMatrix)
      cell.value = cellElement.innerText
      cell.size = new CellSizeWidthHeight(cellElement.offsetWidth, cellElement.offsetHeight);
    })
  }

  getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell:Point2D, matrix:Matrix2D ,htmlMatrix:HTMLElement):HTMLElement[] {
    this.updateMatrixByHtmlMatrix(matrix, htmlMatrix)
    const matrix2DActions:IMatrix2DFacade = new Matrix2DActions()
    const points:Point2D[] = matrix2DActions.getLongestCellElementLineOfValueMatchIntersectingCell(currentCell, matrix)
    const htmlCellElements:HTMLElement[] = []
    points.forEach(point => {
      const cellElement = this.#getCellHtmlElementAtPosition(new PositionRowColumn(point.y,point.x), htmlMatrix)
      htmlCellElements.push(cellElement)
    })
    return htmlCellElements
  }

  getCellHtmlElementPointInHtmlMatrix(cellElement:HTMLElement, htmlMatrix:HTMLElement):Point2D {
    const row = parseInt(cellElement.getAttribute(MagicData.HtmlCellRow) as string)
    const column = parseInt(cellElement.getAttribute(MagicData.HtmlCellColumn) as string)
    return new Point2D(column, row)
  }
}