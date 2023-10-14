import { PositionRowColumn } from './PositionRowColumn'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'

export class Cell {
  position: PositionRowColumn;
  cellSize: CellSizeWidthHeight;
  value: string;

  constructor(position: PositionRowColumn, cellSize: CellSizeWidthHeight = new CellSizeWidthHeight(10, 10), value: string = '') {
    this.position = position;
    this.cellSize = cellSize;
    this.value = value;
  }
}
