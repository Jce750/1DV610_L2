import { PositionRowColumn } from './PositionRowColumn'
import { CellSizeWidthHeight } from './CellSizeWidthHeight'
import { Point2D } from './Point2D';

export class Cell {
  point: Point2D;
  size: CellSizeWidthHeight;
  value: string;

  constructor(point: Point2D, cellSize: CellSizeWidthHeight = new CellSizeWidthHeight(10, 10), value: string = '') {
    this.point = point;
    this.size = cellSize;
    this.value = value;
  }
}
