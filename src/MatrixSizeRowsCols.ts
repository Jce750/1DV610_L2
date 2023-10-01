//TODO: add setter validation

import { ValidatorNumber } from "./ValidatorNumber"

export class MatrixSizeRowsCols {
  #rows:number = 5
  #columns:number = 5

  constructor(rows:number = 5, columns:number = 5){
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
      new ValidatorNumber(rows).checkPositive().checkFinite().checkInteger()
      this.#rows = rows
  }

  set columnsSize(columns:number){
    new ValidatorNumber(columns).checkPositive().checkFinite().checkInteger()
    this.#columns = columns
  }
}