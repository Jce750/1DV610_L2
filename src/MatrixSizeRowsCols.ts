//TODO: add setter validation

import { validator } from "./Validator"

export class MatrixSizeRowsCols {
  #rows:number = 5
  #columns:number = 5
  constructor(public rows:number = 5,public columns:number = 5){
    new validator().isRowColumnFiniteIntegers(rows,columns)
    this.rowsSize = rows
    this.columnsSize = columns
  }

  get rowsSize():number{
    return this.#rows
  }
  get columnsSize():number{
    return this.#columns
  }
  set rowsSize(rows:number){
    this.#rows = rows
  }
  set columnsSize(columns:number){
    this.#columns = columns
  }
}