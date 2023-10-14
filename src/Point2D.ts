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
}