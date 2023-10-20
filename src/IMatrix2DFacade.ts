import { Matrix2D } from "./lib/Matrix2D";
import { Matrix2DActions } from "./lib/Matrix2DActions";
import { MatrixSizeRowsCols } from "./lib/MatrixSizeRowsCols";
import { Point2D } from "./lib/Point2D";

export class IMatrix2DFacade {
  buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D{
    return new Matrix2DActions().buildMatrix2DFromScratch(size)
  }

  buildMatrixFromGameBoardHtmlElement(elementToExamine: HTMLElement): Matrix2D{
    return new Matrix2DActions().buildMatrixFromGameBoardHtmlElement(elementToExamine)
  }

  getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D, matrix:Matrix2D):Point2D[] {
    return new Matrix2DActions().getLongestCellElementLineOfValueMatchIntersectingCells(currentCell, matrix)
  }
}