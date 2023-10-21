import { CellSizeWidthHeight } from './CellSizeWidthHeight'
import { Point2D } from './Point2D';
import { ValidatorMatrix } from './ValidatorMatrix';
import { ValidatorNumber } from './ValidatorNumber';

export class Cell {
  #point: Point2D;
  #size: CellSizeWidthHeight;
  #value: string;

  constructor(point: Point2D, cellSize: CellSizeWidthHeight = new CellSizeWidthHeight(10, 10), value: string = '') {
    this.#point = point;
    this.#size = cellSize;
    this.#value = value;
  }

  get point(): Point2D {
    return this.#point;
  }

  get size(): CellSizeWidthHeight {
    return this.#size;
  }

  get value(): string {
    return this.#value;
  }

  set point(point: Point2D) {
    new ValidatorNumber(point.x).checkPositive().checkFinite().checkInteger();
    new ValidatorNumber(point.y).checkPositive().checkFinite().checkInteger();
    this.#point = point;
  }

  set size(size: CellSizeWidthHeight) {
    this.#size = size;
  }

  set value(value: string) {
    if (value != '') {
      new ValidatorMatrix().checkSingleLetter(value);
    }
    this.#value = value;
  }





  clone(): Cell {
    return new Cell(this.point.clone(), this.size.clone(), this.value);
  }
}
