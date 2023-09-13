export class PositionRowColumn {
  #row:number = 0
  #column:number = 0
  constructor(public rowIndex:number, public columnIndex:number){
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