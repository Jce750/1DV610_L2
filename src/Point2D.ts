import { ValidatorNumber } from "./ValidatorNumber"

export class Point2D {
    #xPosition:number = 0
    #yPosition:number = 0
  constructor(public x:number, public y:number) {
    this.xPosition = x
    this.yPosition = y
  }
  get xPosition() {
    return this.#xPosition
  }
  get yPosition() {
    return this.#yPosition
  }
  set xPosition(newX:number) {
    new ValidatorNumber(newX).checkFinite()
    this.#xPosition = newX
  }
  set yPosition(newY:number) {
    (new ValidatorNumber(newY)).checkFinite()
    this.#yPosition = newY
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