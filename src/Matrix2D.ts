import { Cell } from "./Cell"
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"

/**
 * A class to represent a 2D matrix of cells.
 *
 */
export class Matrix2D {
  public readonly size:MatrixSizeRowsCols = new MatrixSizeRowsCols()
  public readonly cells:Cell[] = []

  constructor(size:MatrixSizeRowsCols, cells:Cell[] = []) {
    this.size = size
    this.cells = cells
  }
}
