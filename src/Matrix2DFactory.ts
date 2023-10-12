import { Cell } from "./Cell";
import { CellSizeWidthHeight } from "./CellSizeWidthHeight";
import { Matrix2D } from "./Matrix2D";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";
import { PositionRowColumn } from "./PositionRowColumn";

export class Matrix2DFactory {

  buildMatrix2DfromScratch(size: MatrixSizeRowsCols): Matrix2D {
    const matrix = new Matrix2D(size);
    for (let row = 0; row < size.rows; row++) {
      for (let column = 0; column < size.columns; column++) {
        const position = new PositionRowColumn(row, column);
        const cell = new Cell(position);
        matrix.addCell(cell);
      }
    }
    return matrix;
  }

  buildMatrix2DFromHtml(gameBoardElement: HTMLElement): Matrix2D {
    const cellNodeList = gameBoardElement.querySelectorAll<HTMLElement>('.cell');  // Assuming cells have class 'cell'
    const cells = this.createCellsFromHtmlCellElements([...cellNodeList] as HTMLElement[]);  // Convert NodeList to Array
    const size = new MatrixSizeRowsCols(this.getMaxRow(cells) + 1, this.getMaxCol(cells) + 1);  // Assuming rows and columns are 0-indexed
    const matrix = new Matrix2D(size);
    this.addCellsToMatrix(matrix, cells);
    return matrix;
  }

  createCellsFromHtmlCellElements(cellElements: HTMLElement[]): Cell[] {
    let maxRow = -1;
    let maxCol = -1;
    const cells: Cell[] = [];
    cellElements.forEach((cellElement) => {
      const cell = this.createCellFromHtmlCellElement(cellElement);
      cells.push(cell);

      // Update maxRow and maxCol
      maxRow = Math.max(maxRow, cell.position.row);
      maxCol = Math.max(maxCol, cell.position.column);
    });
    return cells;
  }

  private createCellFromHtmlCellElement(cellElement: HTMLElement): Cell {
    const row = Number(cellElement.dataset.row);
    const column = Number(cellElement.dataset.col);
    const position = new PositionRowColumn(row, column);
    const cellSize = new CellSizeWidthHeight(cellElement.offsetWidth, cellElement.offsetHeight);
    return new Cell(position, cellSize);
  }

  private getMaxRow(cells: Cell[]): number {
    return cells.reduce((maxRow, cell) => Math.max(maxRow, cell.position.row), -1);
  }

  private getMaxCol(cells: Cell[]): number {
    return cells.reduce((maxCol, cell) => Math.max(maxCol, cell.position.column), -1);
  }

  addCellsToMatrix(matrix:Matrix2D, cells:Cell[]) {
    cells.forEach((cell) => {
      matrix.addCell(cell);
    });
  }
}