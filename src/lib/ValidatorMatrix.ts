import { MatrixSizeRowsCols } from "./MatrixSizeRowsCols"
import { Point2D } from "./Point2D"

export class ValidatorMatrix {

  checkPositionExistInMatrix(position:Point2D, size:MatrixSizeRowsCols){
    if(position.y > size.rows || position.x > size.columns){
      throw new Error('position does not exist in matrix')
    }
    return this
  }

  isPositionInMatrixBoundaries(position:Point2D, size:MatrixSizeRowsCols):boolean{
    return position.y >= 1 && position.y <= size.rows &&
      position.x >= 1 && position.x <= size.columns
  }

  checkArrayIsNotEmpty(array:any[]){
    if(array.length === 0){
      throw new Error('array is empty')
    }
    return this
  }

  checkSingleLetter(value:string) {
    if (!value.match(/[a-z]/i)) {
        throw new Error(`Value must be a letter, but was ${value}`);
    }
    if (value.length !== 1) {
        throw new Error(`Value must be a single letter, but was ${value}`);
    }
}
}