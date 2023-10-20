import { IMatrix2DFacade } from "./IMatrix2DFacade";
import { Matrix2D } from "./Matrix2D";
import { Matrix2DFactory } from "./Matrix2DFactory";
import { MatrixAnalyzer } from "./MatrixAnalyzer";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";
import { Point2D } from "./Point2D";
import { ValidatorMatrix } from "./ValidatorMatrix";


export class Matrix2DActions implements IMatrix2DFacade {
  private factory: Matrix2DFactory;

  constructor() {
    this.factory = new Matrix2DFactory();
  }

  /**
   * Create a rectangular matrix with cells of size rows x columns.
   * Rows go y-axis, columns go x-axis.
   * 
   * @param size 1-indexed
   * @returns {Matrix2D} matrix
   */
  public buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D {
    return this.factory.buildMatrix2DFromScratch(size);
  }

  /**
   * Create a matrix from a compatible HTML element.
   * Would typically be a gameboard element created by the library.
   *
   * @param element gameboard element
   * @returns {Matrix2D} matrix
   */
  public buildMatrixFromGameBoardHtmlElement(element: HTMLElement): Matrix2D {
    return this.factory.buildMatrix2DFromHtml(element);
  }

  /**
   * Get all aligned elements intersecting the the cell at point having the same value.
   * Can typically be used to get the winning line in a game of tic-tac-toe.
   *
   * @param gameBoardHtmlElement the html gameboard element
   * @returns a selection of points
   */
  public getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D, matrix:Matrix2D):Point2D[]{
    const matrixAnalyser = new MatrixAnalyzer(matrix)
    const longest = matrixAnalyser.getLongestMatchingLineIntersectingCell(currentCell)
    console.log('longest in Matrix2Daction', longest)
    return longest
  }

  /**
   * 
   *
   * @param point 
   * @param matrix 
   * @param value 
   * @returns 
   */
  public setCellValueAtPosition(point:Point2D, matrix:Matrix2D, value:string):void{
    new ValidatorMatrix().checkPositionExistInMatrix(point, matrix.size)
    let index = 0
    do {
      if(matrix.cells[index].point.x == point.x && matrix.cells[index].point.y == point.y){
        matrix.cells[index].value = value
        console.log('cell value set at position', point)
        return
      }
      index++
    } while (index < matrix.cells.length)
    throw new Error('cell not found')
  }

  public getCellValueAtPosition(point:Point2D, matrix:Matrix2D):string{
    new ValidatorMatrix().checkPositionExistInMatrix(point, matrix.size)
    let index = 0
    do {
      if(matrix.cells[index].point.x == point.x && matrix.cells[index].point.y == point.y){
        return matrix.cells[index].value
      }
      index++
    } while (index < matrix.cells.length)
    throw new Error('cell not found')
  }
}