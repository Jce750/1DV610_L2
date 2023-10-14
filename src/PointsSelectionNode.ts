import { Point2D } from './Point2D';
import { PointsSelectionComposite } from './PointsSelectionComposite';
import { ValidatorNumber } from './ValidatorNumber';

export class PointsSelectionNode implements PointsSelectionComposite {
  private points: PointsSelectionComposite[] = [];
  readonly x: number;
  readonly y: number;

  constructor(xPosition: number, yPosition: number) {
    new ValidatorNumber(xPosition).checkFinite();
    new ValidatorNumber(yPosition).checkFinite();
    this.x = xPosition;
    this.y = yPosition;
  }

  add(point: PointsSelectionComposite): void {
    this.points.push(point);
  }

  remove(point: PointsSelectionComposite): void {
    const index = this.points.indexOf(point);
    if (index !== -1) {
      this.points.splice(index, 1);
    }
  }

  forEach(callback: (point: Point2D) => void): void {
    for (const point of this.points) {
      point.forEach(callback);
    }
  }
}