import { GameBoard } from "./GameBoard.js"
import { PositionRowColumn } from "./PositionRowColumn"

export class MatrixAnalyzer{

  #gameboard:GameBoard

  constructor(gameboard:GameBoard){
    this.#gameboard = gameboard
  }

  #defineDirections():number[][][]{
    const left = [0, -1]
    const right = [0, 1]
    const horizontal = [left, right]
    const up = [-1, 0]
    const down = [1, 0]
    const vertical = [up, down]
    const downleft = [1, -1]
    const upright = [-1, 1]
    const downLeftToUpRight = [downleft, upright]
    const downRight = [1, 1]
    const upLeft = [-1, -1]
    const upLeftToDownRight = [upLeft, downRight]
    return [horizontal, vertical, downLeftToUpRight, upLeftToDownRight]
  }

  getLongestMatchingLineIntersectingCell(currentCell:HTMLElement):HTMLElement[] {
    const searchDirections = this.#defineDirections()
    let longest:HTMLElement[] = []
    let oppositeSide
    let thisSide
    let longestSoFar
    for (const direction of searchDirections) {
      thisSide = this.#getMatchesInSpecifiedDirection(currentCell, direction[0])
      oppositeSide = this.#getMatchesInSpecifiedDirection(currentCell, direction[1])
      longestSoFar = [...thisSide, currentCell, ...oppositeSide]
      if (longestSoFar.length > longest.length) {
        longest = longestSoFar
      }
    }
    return longest;
  }

  #getMatchesInSpecifiedDirection(currentCell:HTMLElement, direction:number[]):HTMLElement[] {
    const signature = currentCell.innerText
    const board = this.#gameboard
    let currentPosition = this.getCurrentCellElementPosition(currentCell)
    let matchingCells:HTMLElement[] = []
    // Get first neighbor in specified direction
    if (this.#isCellNeighborInDirectionOnBoard(currentPosition, direction)) {
      currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      while (
        board.isRowColumnOnBoard(currentPosition.row, currentPosition.column) &&
        board.getCellElementValueRowCol(currentPosition.row, currentPosition.column) === signature
      ) {
        matchingCells.push(board.getCellElementRowCol(currentPosition.row,currentPosition.column))
        currentPosition = this.getNextCellPositionInDirection(currentPosition, direction)
      }
    }
    return matchingCells;
  }

  getCurrentCellElementPosition(currentCell:HTMLElement):PositionRowColumn {
    const row = Number(currentCell.dataset.row)
    const column = Number(currentCell.dataset.col)
    return new PositionRowColumn(row,column)
  }

  getNextCellPositionInDirection(position:PositionRowColumn, direction:number[]):PositionRowColumn {
    const [dRow, dColumn] = direction
    const row = position.row + dRow
    const column = position.column + dColumn
    return new PositionRowColumn(row,column)
  }

  #isRowColumnOnBoard(row:number, column:number):boolean{
    return row >= 1 && row <= this.#gameboard.size.rowsSize &&
      column >= 1 && column <= this.#gameboard.size.columnsSize
  }

  #isCellNeighborInDirectionOnBoard(position:PositionRowColumn, direction:number[]):boolean {
    const [dRow, dCol] = direction
    const row = position.row + dRow
    const column = position.column + dCol
    return this.#isRowColumnOnBoard(row, column)
  }
}