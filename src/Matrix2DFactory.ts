import { Cell } from "./Cell";
import { CellSizeWidthHeight } from "./CellSizeWidthHeight";
import { MagicData } from "./MagicData";
import { Matrix2D } from "./Matrix2D";
import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols";
import { Point2D } from "./Point2D";
import { PositionRowColumn } from "./PositionRowColumn";
import { RangeMinMax } from "./RangeMinMax";
import { ValidatorMatrix } from "./ValidatorMatrix";

export class Matrix2DFactory {

  // Note that row and column are 1-indexed.
  buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D {
    try {
      const { rows, columns } = size;
      new RangeMinMax(MagicData.MinRows, MagicData.MaxRows).checkValueInRange(rows)
      new RangeMinMax(MagicData.MinColumns,MagicData.MaxColumns).checkValueInRange(columns)
      let cells:Cell[] = [];
      for (let row = 1; row <= size.rows; row++) {
        for (let column = 1; column <= size.columns; column++) {
          const position = new PositionRowColumn(row, column);
          const cell = this.createCellAtPosition(position, size);
          cells.push(cell);
        }
      }
      return new Matrix2D(size, cells);
    } catch (error) {
      throw new Error('invalid size');
    }
  }

  createCellAtPosition(position: PositionRowColumn, matrixSize:MatrixSizeRowsCols): Cell {
    const point = new Point2D(position.column, position.row);
    const validator = new ValidatorMatrix()
    validator.checkPositionExistInMatrix(point, matrixSize);
    const cell = new Cell(position);
    if (!cell) {
      throw new Error('cell not found');
    }
    return cell;
  }

  buildMatrix2DFromHtml(gameBoardElement: HTMLElement): Matrix2D {
    const cellNodeList = gameBoardElement.querySelectorAll<HTMLElement>('.cell');
    const cells = this.createCellsFromHtmlCellElements([...cellNodeList] as HTMLElement[]);
    const size = new MatrixSizeRowsCols(this.getMaxRow(cells), this.getMaxCol(cells));  
    const matrix = new Matrix2D(size);
    return new Matrix2D(size, cells);
  }

  createCellsFromHtmlCellElements(cellElements: HTMLElement[]): Cell[] {
    const cells: Cell[] = [];
    cellElements.forEach((cellElement) => {
      const cell = this.createCellFromHtmlCellElement(cellElement);
      cells.push(cell);
    });
    return cells;
  }

  createCellFromHtmlCellElement(cellElement: HTMLElement): Cell {
    const row = Number(cellElement.getAttribute(MagicData.HtmlCellRow));
    const column = Number(cellElement.getAttribute(MagicData.HtmlCellColumn));
    const position = new PositionRowColumn(row, column);
    const width = Number(cellElement.style.width.replace('px', ''));
    const height = Number(cellElement.style.height.replace('px', ''));
    const cellSize = new CellSizeWidthHeight(width, height);
    return new Cell(position, cellSize);
  }

  private getMaxRow(cells: Cell[]): number {
    return cells.reduce((maxRow, cell) => Math.max(maxRow, cell.position.row), -1);
  }

  private getMaxCol(cells: Cell[]): number {
    return cells.reduce((maxCol, cell) => Math.max(maxCol, cell.position.column), -1);
  }
}