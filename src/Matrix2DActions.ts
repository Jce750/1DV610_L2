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

  public buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D {
    return this.factory.buildMatrix2DFromScratch(size);
  }

  public buildMatrixFromGameBoardHtmlElement(element: HTMLElement): Matrix2D {
    return this.factory.buildMatrix2DFromHtml(element);
  }

  public getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D, matrix:Matrix2D):Point2D[]{
    const matrixAnalyser = new MatrixAnalyzer(matrix)
    return matrixAnalyser.getLongestMatchingLineIntersectingCell(currentCell)
  }

  public setCellValueAtPosition(position:Point2D, matrix:Matrix2D, value:string):void{
    new ValidatorMatrix().checkPositionExistInMatrix(position, matrix.size)
    let index = 0
    do {
      if(matrix.cells[index].position.column == position.x && matrix.cells[index].position.row == position.y){
        matrix.cells[index].value = value
        return
      }
      index++
    } while (index < matrix.cells.length)
    throw new Error('cell not found')
  }

  public getCellValueAtPosition(position:Point2D, matrix:Matrix2D):string{
    new ValidatorMatrix().checkPositionExistInMatrix(position, matrix.size)
    let index = 0
    do {
      if(matrix.cells[index].position.column == position.x && matrix.cells[index].position.row == position.y){
        return matrix.cells[index].value
      }
      index++
    } while (index < matrix.cells.length)
    throw new Error('cell not found')
  }
}