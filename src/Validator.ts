export class validator{
  isRowColumnFiniteIntegers(row:number, column:number){
    if(!Number.isFinite(row) || !Number.isFinite(column)){
      throw new Error('row and column must be finite numbers')
    }
    if(row <= 0 || column <= 0){
      throw new Error('row and column must be greater than 0')
    }
    if(!Number.isInteger(row) || !Number.isInteger(column)){
      throw new Error('row and column must be integers')
    }
  }
}
