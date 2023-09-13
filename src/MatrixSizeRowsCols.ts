//TODO: add setter validation

export class MatrixSizeRowsCols {
  #rows:number = 0
  #columns:number = 0
  constructor(public rows:number,public columns:number){
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

  isValidRange(min:number,max:number){
    return this.rowsSize >= min && this.rowsSize <= max && this.columnsSize >= min && this.columnsSize <= max
  }
}