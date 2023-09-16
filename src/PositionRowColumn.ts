/**
 * A class to represent a position in a 2D array.
 * Position is one-based, not zero-based.
 *
 */
import { validator } from './Validator'
export class PositionRowColumn {
  #row:number = 1
  #column:number = 1
  constructor(public rowIndex:number = 1, public columnIndex:number = 1){
    console.log('PositionRowColumn constructor')
    console.log(rowIndex, columnIndex)
    new validator().isRowColumnFiniteIntegers(rowIndex,columnIndex)
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
    this.#row = row
  }
  set column(column:number){
    this.#column = column
  }
}