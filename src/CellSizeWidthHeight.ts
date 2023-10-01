import {ValidatorNumber} from './ValidatorNumber'

export class CellSizeWidthHeight {
  #width:number = 20
  #height:number = 20
  
  constructor(public pixelWidth:number = 20,public pixelHeight:number = 20) {
    new ValidatorNumber(pixelWidth).checkPositive().checkFinite().checkInteger()
    new ValidatorNumber(pixelHeight).checkPositive().checkFinite().checkInteger()
    this.width = pixelWidth
    this.height = pixelHeight
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