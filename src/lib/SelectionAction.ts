import { Point2D } from "./Point2D";

export class SelectionActions {

  moveFromTo(point1: Point2D, point2: Point2D): Point2D {
    const x = point2.x - point1.x;
    const y = point2.y - point1.y;
    return new Point2D(x, y);
  }

  rotateClockwise90DegreesAroundPoint(point: Point2D, center: Point2D): Point2D {
    const x = center.x - point.y;
    const y = center.y + point.x;
    return new Point2D(x, y);
  }
}