import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { Point2D } from "./Point2D"

export class ValidatorMatrix {

  checkPositionExistInMatrix(position:Point2D, size:MatrixSizeRowsCols){
    if(position.y > size.rows || position.x > size.columns){
      throw new Error('position does not exist in matrix')
    }
    return this
  }
}