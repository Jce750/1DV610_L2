import { Matrix2D } from "./lib/Matrix2D";
import { Matrix2DActions } from "./lib/Matrix2DActions";
import { MatrixSizeRowsCols } from "./lib/MatrixSizeRowsCols";
import { Point2D } from "./lib/Point2D";

/**
 * A facade for general matrix functionality.
 * A facade to the Matrix2DActions and Matrix2DFactory class.
 *
 * @export
 * @class IMatrix2DFacade
 */
export class IMatrix2DFacade {

  /**
   * Build a rectangular matrix of cells given rows and columns.
   * Rows go y-axis, columns go x-axis. (1-indexed)
   *
   * @param {object} size {rows: number, columns: number}
   * @returns {Matrix2D} matrix
   */
  buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D{
    return new Matrix2DActions().buildMatrix2DFromScratch(size)
  }

  /**
   * Get all aligned points intersecting the specified point and having the same value.
   * Can typically be used to get the winning line in a game of tic-tac-toe.
   *
   * @param matrix the html gameboard element
   * @returns a selection of points
   */
  getLongestPointsLineOfValueMatchIntersectingPoint(currentCell:Point2D, matrix:Matrix2D):Point2D[] {
    return new Matrix2DActions().getLongestCellElementLineOfValueMatchIntersectingCells(currentCell, matrix)
  }

    /**
   * Create a matrix from a compatible HTML element.
   * Would typically be a gameboard element created by the library.
   *
   * @param element gameboard element
   * @returns {Matrix2D} matrix
   */
    buildMatrixFromGameBoardHtmlElement(elementToExamine: HTMLElement): Matrix2D{
      return new Matrix2DActions().buildMatrixFromGameBoardHtmlElement(elementToExamine)
    }
}