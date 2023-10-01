import { ValidatorNumber } from "./ValidatorNumber"

export class Scale2D {
  
  #x:number = 1
  #y:number = 1
  
  constructor(x:number, y:number) {
    this.x = x
    this.y = y
  }
  get xScale() {
    return this.#x
  }
  get yScale() {
    return this.y
  }
  set x(newX:number) {
    new ValidatorNumber(newX).checkFinite().checkPositive()
    this.#x = newX;
  }
  set y(newY:number) {
    new ValidatorNumber(newY).checkFinite().checkPositive()
    this.#y = newY;
  }
}