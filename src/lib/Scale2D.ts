import { ValidatorNumber } from "./ValidatorNumber"

export class Scale2D {
  
  #x:number = 1
  #y:number = 1
  
  constructor(x:number, y:number) {
    this.#x = x
    this.#y = y
  }
  get xScale() {
    return this.#x
  }
  get yScale() {
    return this.#y
  }
  set xScale(newX:number) {
    new ValidatorNumber(newX).checkFinite().checkPositive()
    this.#x = newX;
  }
  set yScale(newY:number) {
    new ValidatorNumber(newY).checkFinite().checkPositive()
    this.#y = newY;
  }
}