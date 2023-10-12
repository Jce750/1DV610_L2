import { Point2D } from "./Point2D";

export class Vector2D {

  #point1:Point2D;
  #point2:Point2D;
  #vector:Point2D;

  constructor(private point1: Point2D, private point2: Point2D) {
    this.#point1 = point1;
    this.#point2 = point2;
    this.#vector = new Point2D(point2.x - point1.x, point2.y - point1.y);
  }



  public invertVector():Point2D {
    const newPoint:Point2D = new Point2D(-this.#vector.x, -this.#vector.y)
    return newPoint
  }
}