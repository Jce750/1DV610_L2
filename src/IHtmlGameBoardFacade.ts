import { PointsSelectionComposite } from "./lib/PointsSelectionComposite";
import { GameBoardHtmlActions } from "./lib/GameBoardHtmlActions";
import { Matrix2D } from "./lib/Matrix2D";
import { Point2D } from "./lib/Point2D";
import { MatrixSizeRowsCols } from "./lib/MatrixSizeRowsCols";
import { GameBoardHtmlFactory } from "./lib/GameBoardHtmlFactory";
import { CellSizeWidthHeight } from "./lib/CellSizeWidthHeight";
import { IMatrix2DFacade } from "./IMatrix2DFacade";

export class IHtmlGameBoardFacade {

    /**
  * Returns a single HTMLelement representation of a cell at a point (coordinate).
  * 1-based indexing is used for points.
  *
  * @param point (coordinate) of the cell (x, y is column, row)
  * @param gameBoardElement the html gameboard element
  */
    getCellHtmlElementAtPoint(point:Point2D, gameBoardElement:HTMLElement): HTMLElement {
      return new GameBoardHtmlActions().getCellHtmlElementAtPoint(new Point2D(point.x, point.y), gameBoardElement);
    }

  /**
  * Return the html inner text value of a cell at a row and column.
  * 1-based indexing is used for rows and columns.
  *
  * @param {object} point (coordinate) of the cell (x, y is column, row)
  * @param {HTMLElement} gameBoardElement the html gameboard element
  * @returns {String} the inner text value of the cell
  */
  getCellHtmlElementValueAtPoint(point: { x: number, y: number }, gameBoardElement:HTMLElement):String {
    return new GameBoardHtmlActions().getCellHtmlElementValueAtPoint(new Point2D(point.x, point.y), gameBoardElement);
  }

  /**
   * Add a click event to a single cell.
   *
   * @param cellElement the html cell element
   * @param onclick ref to event handler method
   */
  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void {
    new GameBoardHtmlActions().addClickEventToCell(cellElement, onclick);
  }

  /**
   * Add a click event to all cells in the selection of the html gameboard.
   *
   * @param selection group of points
   * @param onclick ref to event handler method
   * @param gameBoardHtmlElement the html gameboard element
   */
  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    new GameBoardHtmlActions().addClickEventToHtmlElementCells(selection, onclick, gameBoardHtmlElement);
  }

  // Add click event to all cells in the selection of the html gameboard.
  addClickEventToAllCellsInHtmlElement(onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    const selection = this.selectAllCellsPointsInHtmlElement(gameBoardHtmlElement)
    this.addClickEventToHtmlElementCells(selection, onclick, gameBoardHtmlElement)
  }

  /**
   * Update the html matrix with the values from the matrix.
   *
   * @param {Matrix2D} matrix the matrix
   * @param {HTMLElement} htmlMatrix the html matrix
   */
  updateHtmlMatrixByMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    new GameBoardHtmlActions().updateHtmlMatrixByMatrix(matrix, htmlMatrix);
  }

  /**
   * Update the matrix with the values from the html matrix.
   * Pass a reference to the matrix to be updated.
   *
   * @param {Matrix2D} matrix the matrix
   * @param {HTMLElement} htmlMatrix the html matrix
   */
  updateMatrixByHtmlMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    new GameBoardHtmlActions().updateMatrixByHtmlMatrix(matrix, htmlMatrix);
  }

  /**
   * Look for the longest line of matching values intersecting the current cell and return the html elements
   * Search along the horisontal, vertical and diagonal lines of the game board
   *
   * @param currentCell (coordinate) of the cell (x, y is column, row)
   * @param matrix the matrix
   * @param htmlMatrix the html matrix
   * @returns the html elements of the longest line of matching values intersecting the current cell
   * @throws {Error} if the current cell is not found in the matrix
   * @throws {Error} if the html matrix is not found
   */
  getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell:Point2D, matrix:Matrix2D, htmlMatrix:HTMLElement):HTMLElement[] {
    return new GameBoardHtmlActions().getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell, matrix, htmlMatrix);
  }

  /**
   * Creates a game board HTML element with rows and columns.
   *
   * @param matrixSize number of rows and columns
   * @param cellSize pixels
   */
  createGameBoardHtml(matrixSize: { rows: number, columns: number }, cellSize: { width: number, height: number }):HTMLElement {
    return new GameBoardHtmlFactory().createGameBoardHtml(
      new MatrixSizeRowsCols(matrixSize.rows, matrixSize.columns),
      new CellSizeWidthHeight(cellSize.width, cellSize.height)
    );
  }

  /**
   * Create a selection of points containing all the points in the html gameboard.
   *
   * @param gameBoardHtmlElement the html gameboard element
   * @returns a selection of points
   */
  selectAllCellsPointsInHtmlElement(gameBoardHtmlElement:HTMLElement):PointsSelectionComposite {
    return new GameBoardHtmlActions().selectAllCellsPointsInHtmlElement(gameBoardHtmlElement);
  }

  /**
   * Get the html element at a point.
   *
   * @param point (coordinate 1-based) of the cell (x, y is column, row)
   * @param gameBoardElement the html gameboard element
   * @returns the html element at the point
   */
  getCellHtmlElementPointInHtmlMatrix(cellElement:HTMLElement, htmlMatrix:HTMLElement):Point2D {
    return new GameBoardHtmlActions().getCellHtmlElementPointInHtmlMatrix(cellElement, htmlMatrix);
  }

  /**
   * Look for the longest line of matching values intersecting the current cell and return the html elements
   * Search along the horisontal, vertical and diagonal lines of the game board
   *
   * @param gameBoardHtmlElement the html gameboard element
   * @param currentCellHtmlElement the html cell element
   * @returns the html elements of the longest line of matching values intersecting the current cell
   */
  getLongestCellElementLineOfValueMatchIntersectingCell (currentCellHtmlElement:HTMLElement, gameBoardHtmlElement:HTMLElement):HTMLElement[] {
    const currentCellPoint = this.getCellHtmlElementPointInHtmlMatrix(currentCellHtmlElement, gameBoardHtmlElement)
    const matrix = new IMatrix2DFacade(). buildMatrixFromGameBoardHtmlElement(gameBoardHtmlElement)
    const cells = this.getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCellPoint, matrix, gameBoardHtmlElement)
    return cells
  }

  /**
   * Get the size of the game board.
   *
   * @param gameBoardHtmlElement 
   * @returns {rows:number, columns:number}
   */
  getGameBoardSize(gameBoardHtmlElement:HTMLElement):{rows:number, columns:number} {
    return new GameBoardHtmlActions().getGameBoardSize(gameBoardHtmlElement)
  }
}