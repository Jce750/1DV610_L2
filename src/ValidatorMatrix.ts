import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { PositionRowColumn } from "./PositionRowColumn"

export class ValidatorMatrix {

  checkPositionExistInMatrix(position:PositionRowColumn, size:MatrixSizeRowsCols){
    if(position.row > size.rowsSize || position.column > size.columnsSize){
      throw new Error('position does not exist in matrix')
    }
    return this
  }
}