import { ValidatorNumber } from "./ValidatorNumber"

export class Point2D {
    readonly xPosition:number = 0
    readonly yPosition:number = 0
  constructor(public x:number, public y:number) {
    new ValidatorNumber(x).checkFinite()
    new ValidatorNumber(y).checkFinite()
    this.xPosition = x
    this.yPosition = y
  }

  normalize(): Point2D {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Point2D(this.x / length, this.y / length);
  }

  public invertVector():Point2D {
    const newPoint:Point2D = new Point2D(-this.x, -this.y)
    return newPoint
  }

}