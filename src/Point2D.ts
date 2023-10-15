import { ValidatorNumber } from "./ValidatorNumber"
import { PointsSelectionComposite } from "./PointsSelectionComposite"

export class Point2D implements PointsSelectionComposite {
  readonly x: number;
  readonly y: number;

  constructor(xPosition: number, yPosition: number) {
    new ValidatorNumber(xPosition).checkFinite();
    new ValidatorNumber(yPosition).checkFinite();
    this.x = xPosition;
    this.y = yPosition;
  }

  forEach(callback: (point: Point2D) => void): void {
    callback(this);
  }

  equals(point: Point2D): boolean {
    return this.x === point.x && this.y === point.y;
  }

  normalize(): Point2D {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2);
    return new Point2D(this.x / length, this.y / length);
  }
}