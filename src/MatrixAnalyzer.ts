import { Cell } from "./Cell"
import { MagicData } from "./MagicData"
import { Matrix2D } from "./Matrix2D"
import { Point2D } from "./Point2D"
import { PositionRowColumn } from "./PositionRowColumn"
import { Transform2D } from "./Transform"
import { ValidatorMatrix } from "./ValidatorMatrix"

export class MatrixAnalyzer{

  #gameboard:Matrix2D

  constructor(gameboard:Matrix2D){
    this.#gameboard = gameboard
  }

  getLongestMatchingLineIntersectingCell(currentPointXY:Point2D):Point2D[] {
    const vectors = new Transform2D(currentPointXY)
    // get vectors for 0, 45, 90, 135, 180, 225, 270, 315 degrees
    const searchDirections = vectors.getVectorsStepDegrees(MagicData.EightDirections)
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
    const startPosition = currentPointXY
    const currentCell = this.#getCellAtPosition(startPosition)
    let currentPosition = startPosition
    let matchingPositions:Point2D[] = []
    // Get first neighbor in specified direction
    if (this.#isCellNeighborInDirectionOnBoard(currentPosition, direction)) {
      currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      while (
        this.#isPositionInMatrixBoundaries(currentPosition) &&
        this.#getCellAtPosition(currentPosition).value === currentCell.value
      ) {
        matchingPositions.push(new Point2D(currentPosition.y,currentPosition.x))
        currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      }
    }
    return matchingPositions;
  }

  getCurrentCellElementPosition(currentCell:HTMLElement):Point2D {
    const row = Number(currentCell.dataset.row)
    const column = Number(currentCell.dataset.col)
    return new Point2D(row,column)
  }

  getNextCellPositionInDirection(position:Point2D, direction:Transform2D):Point2D {
    const row = position.y + direction.y
    const column = position.x + direction.x
    return new Point2D(row,column)
  }

  #isPositionInMatrixBoundaries(position:Point2D):boolean{
    return position.y >= 1 && position.y <= this.#gameboard.size.rows &&
      position.x >= 1 && position.x <= this.#gameboard.size.columns
  }

  #isCellNeighborInDirectionOnBoard(position:Point2D, direction:Transform2D):boolean {
    const row = position.y + direction.y
    const column = position.x + direction.x
    return this.#isPositionInMatrixBoundaries(new Point2D(row, column))
  }

  #getCellAtPosition(position: Point2D): Cell {
    new ValidatorMatrix().checkPositionExistInMatrix(position, this.#gameboard.size);
    const foundCell = this.#gameboard.cells.find(cell =>
      cell.position.row === position.y && cell.position.column === position.x
    );
    if (!foundCell) {
      throw new Error('Cell not found');
    }
    return foundCell;
  }
}