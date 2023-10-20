import { Cell } from "./Cell"
import { MagicData } from "./MagicData"
import { Matrix2D } from "./Matrix2D"
import { Point2D } from "./Point2D"
import { Transform2D } from "./Transform"
import { ValidatorMatrix } from "./ValidatorMatrix"

export class MatrixAnalyzer{

  #gameboard:Matrix2D
  #validator:ValidatorMatrix = new ValidatorMatrix()

  constructor(gameboard:Matrix2D){
    this.#gameboard = gameboard
  }

  getLongestMatchingLineIntersectingCell(currentPointXY:Point2D):Point2D[] {
    this.#validator.checkPositionExistInMatrix(currentPointXY, this.#gameboard.size);
    // get vectors for 0, 45, 90, 135degrees
    const searchDirections = this.#getSearchDirections(currentPointXY);
    let longestLineOfMatches:Point2D[] = []
    for (const direction of searchDirections) {
      const currentLongest = this.#findLongestLineInDirection(currentPointXY, direction);
      longestLineOfMatches = this.#updateLongestLineOfMatches(longestLineOfMatches, currentLongest);
    }
    return longestLineOfMatches;
  }

  getCurrentCellElementPosition(currentCell:HTMLElement):Point2D {
    const row = Number(currentCell.dataset.row)
    const column = Number(currentCell.dataset.col)
    return new Point2D(column, row) //x, y
  }

  #getSearchDirections(currentPoint: Point2D): Transform2D[] {
    const vectors = new Transform2D(currentPoint);
    return vectors.getVectorsStepDegrees(MagicData.Step45, MagicData.SemiCircle);
  }

  #findLongestLineInDirection(currentPoint: Point2D, direction: Transform2D): Point2D[] {
    const positiveDirection = this.#getMatchesInSpecifiedDirection(currentPoint, direction);
    const negativeDirection = this.#getMatchesInSpecifiedDirection(currentPoint, direction.getInvertedCopy());
    return [...positiveDirection, currentPoint, ...negativeDirection];
  }

  #updateLongestLineOfMatches(longestLine: Point2D[], newLine: Point2D[]): Point2D[] {
    return newLine.length > longestLine.length ? newLine : longestLine;
  }

  #getMatchesInSpecifiedDirection(currentPoint:Point2D, direction:Transform2D):Point2D[] {
    let matchingPositions:Point2D[] = []
    let currentPosition = currentPoint
    const currentCell = this.#getCellAtPosition(currentPosition)
    while (this.#isNextCellInDirectionMatching(currentPosition, currentCell, direction)) {
      currentPosition = this.#getNextCellPositionInDirection(currentPosition, direction);
      matchingPositions.push(new Point2D(currentPosition.x, currentPosition.y));
    }
    return matchingPositions;
  }

  #isNextCellInDirectionMatching(currentPosition: Point2D, currentCell:Cell, direction: Transform2D): boolean {
    if (!this.#validator.isPositionInMatrixBoundaries(currentPosition, this.#gameboard.size)) {
      return false;
    }
    const nextPosition = this.#getNextCellPositionInDirection(currentPosition, direction);
    return this.#validator.isPositionInMatrixBoundaries(nextPosition, this.#gameboard.size) &&
      this.#getCellAtPosition(nextPosition).value === currentCell.value;
  }

  #getNextCellPositionInDirection(position:Point2D, direction:Transform2D):Point2D {
    const y = position.y + direction.y
    const x = position.x + direction.x
    return new Point2D(x,y)
  }

  #getCellAtPosition(position: Point2D): Cell {
    new ValidatorMatrix().checkPositionExistInMatrix(position, this.#gameboard.size);
    const foundCell = this.#gameboard.cells.find(cell =>
      cell.point.y === position.y && cell.point.x === position.x
    );
    if (!foundCell) {
      throw new Error('Cell not found');
    }
    return foundCell;
  }

}