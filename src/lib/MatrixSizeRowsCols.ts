import { ValidatorNumber } from "./ValidatorNumber"

export class MatrixSizeRowsCols {
  #rows:number = 5
  #columns:number = 5

  constructor(rows:number = 5, columns:number = 5){
    this.rows = rows
    this.columns = columns
  }

  get rows():number{
    return this.#rows
  }

  get columns():number{
    return this.#columns
  }

  set rows(rows:number){
      new ValidatorNumber(rows).checkPositive().checkFinite().checkInteger()
      this.#rows = rows
  }

  set columns(columns:number){
    new ValidatorNumber(columns).checkPositive().checkFinite().checkInteger()
    this.#columns = columns
  }
}