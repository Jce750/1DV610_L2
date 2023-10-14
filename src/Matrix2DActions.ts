import { IMatrix2DFacade } from "./IMatrix2DFacade";
import { Matrix2D } from "./Matrix2D";
import { Matrix2DFactory } from "./Matrix2DFactory";
import { MatrixAnalyzer } from "./MatrixAnalyzer";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";
import { Point2D } from "./Point2D";


export class Matrix2DActions implements IMatrix2DFacade {
  private factory: Matrix2DFactory;

  constructor() {
    this.factory = new Matrix2DFactory();
  }

  public buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D {
    return this.factory.buildMatrix2DfromScratch(size);
  }

  public buildMatrixFromGameBoardHtmlElement(element: HTMLElement): Matrix2D {
    return this.factory.buildMatrix2DFromHtml(element);
  }

  public getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D, matrix:Matrix2D):Point2D[]{
    const matrixAnalyser = new MatrixAnalyzer(matrix)
    return matrixAnalyser.getLongestMatchingLineIntersectingCell(currentCell)
  }

  public setCellValueAtPosition(position:Point2D, matrix:Matrix2D, value:string):void{
    const cell = matrix.cells.find(cell => cell.column == position.x && cell.row == position.y)
    if(!cell){
      throw new Error('cell not found')
    }
    cell.value = value
  }

}