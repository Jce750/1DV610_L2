import { GameBoard } from "./GameBoard"

export class MatrixAnalyzer{

  #gameboard:GameBoard

  constructor(gameboard:GameBoard){
    this.#gameboard = gameboard
  }

  test(){
    console.log('Hello from MatrixAnalyzer')
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
    console.log(`longest: ${longest.length}`)
    return longest;
  }

  #getMatchesInSpecifiedDirection(currentCell:HTMLElement, direction:number[]):HTMLElement[] {
    const [dRow, dCol] = direction
    const signature = currentCell.innerText
    // Get first neighbor in specified direction
    let row = Number(currentCell.dataset.row) + dRow
    console.log(`Check dir: ${direction}`)
    let col = Number(currentCell.dataset.col) + dCol
    console.log(`pos2compare: ${row},${col}`)
    
    let matchingCells:HTMLElement[] = []
    const board = this.#gameboard
    let length = 0;
    while (
      row > 0 && row <= board.size.rowsSize &&
      col > 0 && col <= board.size.columnsSize &&
      board.getCellElementValueRowCol(row,col) === signature
    ) {
      console.log(`sig: ${signature} = ${board.getCellElementValueRowCol(row,col)}`)
      console.log(`push row: ${row}, ${col}`)
      matchingCells.push(board.getCellElementRowCol(row,col))
      row += dRow;
      col += dCol;
    }
    console.log(`No match for: ${signature} at ${row},${col}`)
    return matchingCells;
  }
}