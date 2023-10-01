import { Cell } from "./Cell"
import { GameBoard } from "./GameBoard"
import { Matrix2D } from "./Matrix2D"
import { Point2D } from "./Point2D"
import { PositionRowColumn } from "./PositionRowColumn"
import { RangeMinMax } from "./RangeMinMax"
import { Rotation } from "./Rotation"
import { Scale2D } from "./Scale2D"
import { Transform } from "./Transform"

export class MatrixAnalyzer{

  #gameboard:Matrix2D

  constructor(gameboard:Matrix2D){
    this.#gameboard = gameboard
  }

  // #get():Transform[]{
  //   for (let degree = 0; degree < 360; degree += 45) {
  //     const vectors:Transform[] = new Transform(new Point(0,0), new Rotation(degree), new Scale(1,1))
  //   }
  //   const right = new Transform([0, 1])
  //   const horizontal = [left, right]
  //   const up = [-1, 0]
  //   const down = [1, 0]
  //   const vertical = [up, down]
  //   const downleft = [1, -1]
  //   const upright = [-1, 1]
  //   const downLeftToUpRight = [downleft, upright]
  //   const downRight = [1, 1]
  //   const upLeft = [-1, -1]
  //   const upLeftToDownRight = [upLeft, downRight]
  //   return [horizontal, vertical, downLeftToUpRight, upLeftToDownRight]
  // }

  getLongestMatchingLineIntersectingCell(currentPointXY:Point2D):Point2D[] {
    const vectors = new Transform(currentPointXY, new Rotation(0), new Scale2D(1,1))
    // get vectors for 0, 45, 90, 135, 180, 225, 270, 315 degrees
    const directions = vectors.getVectorsStepDegrees(new RangeMinMax(0,360), 45).map(vector => vector.point)
    let longestLineOfMatches:Point2D[] = []
    let positiveDirection:Point2D[]
    let negativeDirection:Point2D[]
    let longestSoFar:Point2D[]
    for (const direction of directions) {
      positiveDirection = this.#getMatchesInSpecifiedDirection(currentPointXY, direction)
      negativeDirection = this.#getMatchesInSpecifiedDirection(currentPointXY, direction.invertVector())
      longestSoFar = [...positiveDirection, currentPointXY, ...negativeDirection]
      if (longestSoFar.length > longestLineOfMatches.length) {
        longestLineOfMatches = longestSoFar
      }
    }
    return longestLineOfMatches;
  }

  #getMatchesInSpecifiedDirection(currentPointXY:Point2D, direction:Point2D):Point2D[] {
    const startPosition = new PositionRowColumn(currentPointXY.x, currentPointXY.y)
    const currentCell = this.#gameboard.getCellAtPosition(startPosition)
    let currentPosition = startPosition
    let matchingPositions:Point2D[] = []
    // Get first neighbor in specified direction
    if (this.#isCellNeighborInDirectionOnBoard(currentPosition, direction)) {
      currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      while (
        this.#isRowColumnOnBoard(currentPosition) &&
        this.#gameboard.getCellAtPosition(currentPosition).value === currentCell.value
      ) {
        matchingPositions.push(new Point2D(currentPosition.row,currentPosition.column))
        currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      }
    }
    return matchingPositions;
  }



  getCurrentCellElementPosition(currentCell:HTMLElement):PositionRowColumn {
    const row = Number(currentCell.dataset.row)
    const column = Number(currentCell.dataset.col)
    return new PositionRowColumn(row,column)
  }

  getNextCellPositionInDirection(position:PositionRowColumn, direction:Point2D):PositionRowColumn {
    const row = position.row + direction.x
    const column = position.column + direction.y
    return new PositionRowColumn(row,column)
  }

  #isRowColumnOnBoard(position:PositionRowColumn):boolean{
    return position.row >= 1 && position.row <= this.#gameboard.size.rowsSize &&
      position.column >= 1 && position.column <= this.#gameboard.size.columnsSize
  }

  #isCellNeighborInDirectionOnBoard(position:PositionRowColumn, direction:Point2D):boolean {
    const row = position.row + direction.x
    const column = position.column + direction.y
    return this.#isRowColumnOnBoard(new PositionRowColumn(row, column))
  }
}