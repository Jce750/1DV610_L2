import { Limits } from "./Limits"
import { Matrix2D } from "./Matrix2D"
import { Point2D } from "./Point2D"
import { PositionRowColumn } from "./PositionRowColumn"
import { Transform2D } from "./Transform"

export class MatrixAnalyzer{

  #gameboard:Matrix2D

  constructor(gameboard:Matrix2D){
    this.#gameboard = gameboard
  }

  getLongestMatchingLineIntersectingCell(currentPointXY:Point2D):Point2D[] {
    const vectors = new Transform2D(currentPointXY)
    // get vectors for 0, 45, 90, 135, 180, 225, 270, 315 degrees
    const searchDirections = vectors.getVectorsStepDegrees(Limits.EightDirections)
    let longestLineOfMatches:Point2D[] = []
    let positiveDirection:Point2D[]
    let negativeDirection:Point2D[]
    let longestSoFar:Point2D[]
    for (const direction of searchDirections) {
      positiveDirection = this.#getMatchesInSpecifiedDirection(currentPointXY, direction)
      negativeDirection = this.#getMatchesInSpecifiedDirection(currentPointXY, direction.getInvertedCopy())
      longestSoFar = [...positiveDirection, currentPointXY, ...negativeDirection]
      if (longestSoFar.length > longestLineOfMatches.length) {
        longestLineOfMatches = longestSoFar
      }
    }
    return longestLineOfMatches;
  }

  #getMatchesInSpecifiedDirection(currentPointXY:Point2D, direction:Transform2D):Point2D[] {
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

  getNextCellPositionInDirection(position:PositionRowColumn, direction:Transform2D):PositionRowColumn {
    const row = position.row + direction.x
    const column = position.column + direction.y
    return new PositionRowColumn(row,column)
  }

  #isRowColumnOnBoard(position:PositionRowColumn):boolean{
    return position.row >= 1 && position.row <= this.#gameboard.size.rowsSize &&
      position.column >= 1 && position.column <= this.#gameboard.size.columnsSize
  }

  #isCellNeighborInDirectionOnBoard(position:PositionRowColumn, direction:Transform2D):boolean {
    const row = position.row + direction.x
    const column = position.column + direction.y
    return this.#isRowColumnOnBoard(new PositionRowColumn(row, column))
  }
}