import { Matrix2D } from "./Matrix2D";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";
import { Point2D } from "./Point2D";

export interface IMatrix2DFacade {
  buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D
  buildMatrixFromGameBoardHtmlElement(element: HTMLElement): Matrix2D;
  getLongestCellElementLineOfValueMatchIntersectingCell(currentCell:Point2D, matrix:Matrix2D):Point2D[]
}