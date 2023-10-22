import { MagicData } from './MagicData'
import {ValidatorNumber} from './ValidatorNumber'

export class CellSizeWidthHeight {
  #width:number = MagicData.DefaultCellSize
  #height:number = MagicData.DefaultCellSize

  constructor(public _width:number = MagicData.DefaultCellSize ,public _height:number = MagicData.DefaultCellSize) {
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

  clone():CellSizeWidthHeight{
    return new CellSizeWidthHeight(this.width, this.height)
  }
}