import { IMatrix2DFacade } from "./IMatrix2DFacade";
import { Matrix2D } from "./Matrix2D";
import { Matrix2DFactory } from "./Matrix2DFactory";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";


export class Matrix2DFacade implements IMatrix2DFacade {
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
}