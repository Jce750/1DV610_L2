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
import { IMatrix2DFacade } from "../IMatrix2DFacade"

export class GameBoardHtmlActions {

  getCellHtmlElementAtPoint(point:Point2D, gameBoardElement:HTMLElement): HTMLElement {
    const allCellElements = this.#queryAllCellHtmlElements(gameBoardElement);
    const foundElement = Array.from(allCellElements).find(cell => this.#isMatchingCell(cell, point));
    if (foundElement instanceof HTMLElement) {
      return foundElement;
    } else {
      throw new Error('Element not found at given point');
    }
  }

  getCellHtmlElementValueAtPoint(point:Point2D, gameBoardElement:HTMLElement):string{
    return this.getCellHtmlElementAtPoint(point, gameBoardElement).innerText
  }


  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    selection.forEach((point:Point2D) => {
      const cellElement = this.getCellHtmlElementAtPoint(point, gameBoardHtmlElement)
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
    if (!gameBoardHtmlElement) {
      throw new Error('gameBoardHtmlElement is not defined')
    }
    const selection = new PointsSelectionNode(0,0)
    const {rows, columns} = this.#getGameBoardElementRowsColumns(gameBoardHtmlElement)
    for (let row = 1; row <= rows; row++) {
      this.#addPointsForRow(gameBoardHtmlElement, row, selection)
    }
    return selection
  }



  /**
  * To be implemented
  */
  removeClickEventFromCells(cellElements:NodeListOf<Element>):void {
    throw new Error('Not implemented')
  }


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

  getGameBoardSize(gameBoardHtmlElement:HTMLElement):{rows:number, columns:number} {
    const matrix = new IMatrix2DFacade().buildMatrixFromGameBoardHtmlElement(gameBoardHtmlElement)
    return {rows:matrix.size.rows, columns:matrix.size.columns}
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

  #addPointsForRow(gameBoardHtmlElement:HTMLElement, row:number, selection:PointsSelectionNode):void {
    const {columns} = this.#getGameBoardElementRowsColumns(gameBoardHtmlElement)
    for (let column = 1; column <= columns; column++) {
      selection.add(new Point2D(column, row))
    }
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