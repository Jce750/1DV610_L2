import { Point2D } from "./Point2D";

export interface PointsSelectionComposite {
  readonly x: number;
  readonly y: number;
  
  // Lets you traverse the composite structure and manipulate all the points.
  forEach(callback: (point: Point2D) => void): void;
}