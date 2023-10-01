/**
 * A class to represent a position in a 2D array.
 * Position is one-based, not zero-based.
 *
 */
import { ValidatorNumber } from './ValidatorNumber'

export class PositionRowColumn {
  #row:number = 1
  #column:number = 1

  constructor(public rowIndex:number = 1, public columnIndex:number = 1){
    this.row = rowIndex
    this.column = columnIndex
  }

  get row():number{
    return this.#row
  }

  get column():number{
    return this.#column
  }

  set row(row:number){
    new ValidatorNumber(row).checkPositive().checkFinite().checkInteger()
    this.#row = row
  }

  set column(column:number){
    new ValidatorNumber(column).checkPositive().checkFinite().checkInteger()
    this.#column = column
  }
}