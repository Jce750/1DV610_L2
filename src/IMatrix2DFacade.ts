import { Matrix2D } from "./Matrix2D";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";

export interface IMatrix2DFacade {
  buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D
  buildMatrixFromGameBoardHtmlElement(element: HTMLElement): Matrix2D;

}