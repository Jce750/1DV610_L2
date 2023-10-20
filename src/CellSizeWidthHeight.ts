import {ValidatorNumber} from './ValidatorNumber'

export class CellSizeWidthHeight {
  #width:number = 20
  #height:number = 20

  constructor(public _width:number = 20,public _height:number = 20) {
    this.width = _width
    this.height = _height
  }

  get width():number{
    return this.#width
  }
  get height():number{
    return this.#height
  }
  set width(width:number){
    new ValidatorNumber(width).checkPositive().checkFinite().checkInteger()
    this.#width = width
  }
  set height(height:number){
    new ValidatorNumber(height).checkPositive().checkFinite().checkInteger()
    this.#height = height
  }
}