import { PointsSelectionComposite } from "./lib/PointsSelectionComposite";
import { GameBoardHtmlActions } from "./lib/GameBoardHtmlActions";
import { Matrix2D } from "./lib/Matrix2D";
import { Point2D } from "./lib/Point2D";
import { MatrixSizeRowsCols } from "./lib/MatrixSizeRowsCols";
import { GameBoardHtmlFactory } from "./lib/GameBoardHtmlFactory";
import { CellSizeWidthHeight } from "./lib/CellSizeWidthHeight";
import { IMatrix2DFacade } from "./IMatrix2DFacade";

export class IHtmlGameBoardFacade {
  // Get the value of html element at a row and column
  getCellHtmlElementValueAtPoint(pointObject: { x: number, y: number }, gameBoardElement:HTMLElement):String {
    let point:Point2D;
    if (pointObject.hasOwnProperty("x") && pointObject.hasOwnProperty("y")) {
      point = new Point2D(pointObject.x, pointObject.y);
    } else {
      throw new Error("pointObject must have two properties: x and y")
    }
    return new GameBoardHtmlActions().getCellHtmlElementValueAtPoint(point, gameBoardElement);
  }

  // Add click event to a single cell
  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void {
    new GameBoardHtmlActions().addClickEventToCell(cellElement, onclick);
  }

  // Select Points on the matrix and add click event to html elements
  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void {
    new GameBoardHtmlActions().addClickEventToHtmlElementCells(selection, onclick, gameBoardHtmlElement);
  }

  // Update/synchronize size and value from matrix to html
  updateHtmlMatrixByMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    new GameBoardHtmlActions().updateHtmlMatrixByMatrix(matrix, htmlMatrix);
  }

  // Update/synchronize size and value from html to matrix
  updateMatrixByHtmlMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void {
    new GameBoardHtmlActions().updateMatrixByHtmlMatrix(matrix, htmlMatrix);
  }

  // Look for the longest line of matching values intersecting the current cell and return the html elements
  // Search along the horisontal, vertical and diagonal lines of the game board
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
   * Creates a single cell HTML element at a point.
   *
   * @param point x (columns), y (rows) coordinates (1-indexed)
   * @param cellSize pixels
   */
  selectAllCellsPointsInHtmlElement(gameBoardHtmlElement:HTMLElement):PointsSelectionComposite {
    return new GameBoardHtmlActions().selectAllCellsPointsInHtmlElement(gameBoardHtmlElement);
  }

  /**
   * Get the html element at a point.
   *
   */
  getCellHtmlElementPointInHtmlMatrix(cellElement:HTMLElement, htmlMatrix:HTMLElement):Point2D {
    return new GameBoardHtmlActions().getCellHtmlElementPointInHtmlMatrix(cellElement, htmlMatrix);
  }

  getLongestCellElementLineOfValueMatchIntersectingCell (currentCellHtmlElement:HTMLElement, gameBoardHtmlElement:HTMLElement):HTMLElement[] {
    const currentCellPoint = this.getCellHtmlElementPointInHtmlMatrix(currentCellHtmlElement, gameBoardHtmlElement)
    const matrix = new IMatrix2DFacade(). buildMatrixFromGameBoardHtmlElement(gameBoardHtmlElement)
    const cells = this.getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCellPoint, matrix, gameBoardHtmlElement)
    return cells
  }

  getGameBoardSize(gameBoardHtmlElement:HTMLElement):{rows:number, columns:number} {
    const matrix = new IMatrix2DFacade().buildMatrixFromGameBoardHtmlElement(gameBoardHtmlElement)
    return matrix.size
  }
}