//TODO: add setter validation

import { validator } from "./Validator.js"

export class MatrixSizeRowsCols {
  #rows:number = 5
  #columns:number = 5
  constructor(rows:number = 5, columns:number = 5){
    new validator(rows).isPositive().isFinite().isInteger()
    new validator(columns).isPositive().isFinite().isInteger()
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