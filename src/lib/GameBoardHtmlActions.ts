import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { PointsSelectionComposite } from "./PointsSelectionComposite"
import { Point2D } from "./Point2D"
import { MagicData } from "./MagicData"
import { Matrix2D } from "./Matrix2D"
import { CellSizeWidthHeight } from "./CellSizeWidthHeight"
import { Matrix2DActions } from "./Matrix2DActions"
import { PointsSelectionNode } from "./PointsSelectionNode"
import { Cell } from "./Cell"
import { ValidatorMatrix } from "./ValidatorMatrix"

export class GameBoardHtmlActions {

  /**
  * Returns a single HTMLelement representation of a cell at a point (coordinate).
  * 1-based indexing is used for points.
  *
  */
  getCellHtmlElementAtPoint(point:Point2D, gameBoardElement:HTMLElement): HTMLElement {
    const allCellElements = this.#queryAllCellHtmlElements(gameBoardElement);
    const foundElement = Array.from(allCellElements).find(cell => this.#isMatchingCell(cell, point));
    if (foundElement instanceof HTMLElement) {
      return foundElement;
    } else {
      throw new Error('Element not found at given point');
    }
  }

  /**
  * Return the html inner text value of a cell at a row and column.
  * 1-based indexing is used for rows and columns.
  *
  */
  getCellHtmlElementValueAtPoint(point:Point2D, gameBoardElement:HTMLElement):string{
    return this.getCellHtmlElementAtPoint(point, gameBoardElement).innerText
  }

  /**
   * Add a click event to all cells in the selection of the html gameboard.
   *
   * @param selection group of points
   * @param onclick ref to event handler method
   * @param gameBoardHtmlElement the html gameboard element
   */
  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    selection.forEach((point:Point2D) => {
      const cellElement = this.getCellHtmlElementAtPoint(point, gameBoardHtmlElement)
      this.addClickEventToCell(cellElement, onclick)
    })
  }

  /**
   * Add a click event to a single cell.
   *
   * @param cellElement the html cell element
   * @param onclick ref to event handler method
   */
  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void {
    if (typeof onclick !== 'function') {
      throw new Error('onclick must be a function')
    }
    cellElement.addEventListener('click', onclick)
  }

  /**
   * Create a selection of points containing all the points in the html gameboard.
   *
   * @param gameBoardHtmlElement the html gameboard element
   * @returns a selection of points
   */
  selectAllCellsPointsInHtmlElement(gameBoardHtmlElement:HTMLElement):PointsSelectionComposite {
    if (!gameBoardHtmlElement) {
      throw new Error('gameBoardHtmlElement is not defined')
    }
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
      const cellElement = this.getCellHtmlElementAtPoint(cell.point, htmlMatrix)
      this.#updateHtmlCell(cell, cellElement)
    })
  }

  updateMatrixByHtmlMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    matrix.cells.forEach(cell => {
      const cellElement = this.getCellHtmlElementAtPoint(cell.point, htmlMatrix)
      this.#updateMatrixCell(cell, cellElement)
    })
  }



  getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell:Point2D, matrix:Matrix2D ,htmlMatrix:HTMLElement):HTMLElement[] {
    this.updateMatrixByHtmlMatrix(matrix, htmlMatrix)
    const matrix2DActions = new Matrix2DActions()
    const points = matrix2DActions.getLongestCellElementLineOfValueMatchIntersectingCells(currentCell, matrix)
    const htmlCellElements = points.map(point => this.getCellHtmlElementAtPoint(point, htmlMatrix))
    return htmlCellElements
  }

  getCellHtmlElementPointInHtmlMatrix(cellElement:HTMLElement, htmlMatrix:HTMLElement):Point2D {
    const y = parseInt(cellElement.getAttribute(MagicData.HtmlCellRow) as string)
    const x = parseInt(cellElement.getAttribute(MagicData.HtmlCellColumn) as string)
    return new Point2D(x, y)
  }

  #queryAllCellHtmlElements(gameBoardElement:HTMLElement):NodeListOf<Element>{
    return gameBoardElement.querySelectorAll(MagicData.HtmlDotCellSelector)
  }

  #isMatchingCell(cellElement: Element, point:Point2D): boolean {
    return cellElement.getAttribute(MagicData.HtmlCellColumn) === point.x.toString() &&
      cellElement.getAttribute(MagicData.HtmlCellRow) === point.y.toString()
  }

  #updateHtmlCell(cell:Cell, htmlCell:HTMLElement):void {
    htmlCell.innerText = cell.value.toString()
    htmlCell.style.width = `${cell.size.width}px`
    htmlCell.style.height = `${cell.size.height}px`
  }

  #updateMatrixCell(cell:Cell, htmlCell:HTMLElement):void {
    cell.value = htmlCell.innerText
    cell.size = new CellSizeWidthHeight(htmlCell.offsetWidth, htmlCell.offsetHeight);
  }

  #getGameBoardElementRowsColumns(gameBoardElement:HTMLElement):MatrixSizeRowsCols{
    const cells = this.#getAllHtmlElementCellsAsArray(gameBoardElement)
    const validator = new ValidatorMatrix().checkArrayIsNotEmpty(cells)
    const uniqueRows = this.#getUniqueAttributes(cells, MagicData.HtmlCellRow)
    const uniqueColumns = this.#getUniqueAttributes(cells, MagicData.HtmlCellColumn)
    return new MatrixSizeRowsCols(uniqueRows.size,uniqueColumns.size)
  }

  #getAllHtmlElementCellsAsArray(gameBoardElement:HTMLElement):HTMLElement[]{
    const cells = this.#getAllHtmlElementCells(gameBoardElement)
    return [...cells] as HTMLElement[]
  }

  #getUniqueAttributes(cells:HTMLElement[], attribute:string):Set<string>{
    const uniqueAttributes = new Set<string>()
    cells.forEach(cell => {
      const attributeName = cell.getAttribute(attribute)
      if (attributeName) {
        uniqueAttributes.add(attributeName)
      }
    })
    return uniqueAttributes
  }

  #getAllHtmlElementCells(gameBoardElement:HTMLElement):NodeListOf<Element>{
    return gameBoardElement.querySelectorAll(MagicData.HtmlDotCellSelector)
  }




}