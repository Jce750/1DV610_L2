import { MagicData } from "./MagicData"
import { ValidatorNumber } from "./ValidatorNumber"

export class MatrixSizeRowsCols {
  #rows:number = MagicData.DefaultRowsColumnsCount
  #columns:number = MagicData.DefaultRowsColumnsCount

  constructor(rows:number = MagicData.DefaultRowsColumnsCount, columns:number = MagicData.DefaultRowsColumnsCount){
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