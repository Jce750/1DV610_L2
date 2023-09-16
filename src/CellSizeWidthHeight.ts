import {validator} from './Validator'

export class CellSizeWidthHeight {
  #width:number = 20
  #height:number = 20
  
  constructor(public pixelWidth:number = 20,public pixelHeight:number = 20) {
    new validator().isRowColumnFiniteIntegers(pixelWidth,pixelHeight)
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
    this.#width = width
  }
  set height(height:number){
    this.#height = height
  }
}