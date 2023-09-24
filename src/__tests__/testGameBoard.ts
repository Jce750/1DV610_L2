/**
 * @jest-environment jsdom
 */
import { GameBoard } from "../GameBoard";
import { MatrixAnalyzer } from "../MatrixAnalyzer";
describe.skip('GameBoard', () => {
  let gameboard:GameBoard
  const mockHandleClickEvent = jest.fn()

  beforeEach(() => {
    gameboard = new GameBoard(5,5)
  })

  it ('should create a gameboard with 5 rows and 5 columns', () => {
    expect(gameboard.size.rowsSize).toBe(5)
    expect(gameboard.size.columnsSize).toBe(5)
  })

  it ('should throw an error if rows is less than 1', () => {
    expect(() => new GameBoard(0,5)).toThrow()
  })

  it ('should create a gameboard with 10px width and height cells', () => {
    expect(gameboard.cellSize.width).toBe(10)
    expect(gameboard.cellSize.height).toBe(10)
  })

  it ('should contain a gameboard element', () => {
    expect(gameboard.element).toBeTruthy()
  })

  it ('should contain 25 cells', () => {
    expect(gameboard.cellElements.length).toBe(25)
  })

  it ('should return a cell element for a given row and column', () => {
    const cellElement = gameboard.getCellElementRowCol(1,1)
    expect(cellElement).toBeTruthy()
  })

  it ('should throw an error if row is less than 1', () => {
    expect(() => gameboard.getCellElementRowCol(0,1)).toThrow('row or column out of range')
  })

  it ('should return a cell element value for a given row and column', () => {
    gameboard.getCellElementRowCol(1,1).innerText = 'X'
    const cellElementValue = gameboard.getCellElementValueRowCol(1,1)
    expect(cellElementValue).toBe('X')
  })

  it ('should count the number of cells that have been clicked', () => {
    gameboard.addClickEventToCells(gameboard.allCells, mockHandleClickEvent)
    gameboard.cellElements.forEach(cell => {
      cell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(mockHandleClickEvent).toHaveBeenCalledTimes(25); // 5x5 = 25 cells
  })

  it ('should return the longest line of cells that match the value of the clicked cell', () => {
    const cell = gameboard.getCellElementRowCol(1,1)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(1,2).innerText = 'X'
    gameboard.getCellElementRowCol(1,3).innerText = 'X'
    gameboard.getCellElementRowCol(1,4).innerText = 'X'
    gameboard.getCellElementRowCol(1,5).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(5)
  })

  it ('should return the longest line of cells that match the value of the clicked cell even when added in the middle', () => {
    const cell = gameboard.getCellElementRowCol(1,3)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(1,1).innerText = 'X'
    gameboard.getCellElementRowCol(1,2).innerText = 'X'
    gameboard.getCellElementRowCol(1,4).innerText = 'X'
    gameboard.getCellElementRowCol(1,5).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(5)
  })

  it ('should return the longest diagonal line of cells that match the value of the clicked cell even when added in the middle', () => {
    const cell = gameboard.getCellElementRowCol(3,3)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(1,1).innerText = 'X'
    gameboard.getCellElementRowCol(2,2).innerText = 'X'
    gameboard.getCellElementRowCol(4,4).innerText = 'X'
    gameboard.getCellElementRowCol(5,5).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(5)
  })

  it ('should return the longest line of cells that match the value of the clicked cell', () => {
    const cell = gameboard.getCellElementRowCol(3,3)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(1,1).innerText = 'X'
    gameboard.getCellElementRowCol(2,2).innerText = 'X'
    gameboard.getCellElementRowCol(4,4).innerText = 'O'
    gameboard.getCellElementRowCol(5,5).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(3)
  })

  it ('should return the longest line of cells that match the value of the clicked cell', () => {
    const cell = gameboard.getCellElementRowCol(3,3)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(3,1).innerText = 'X'
    gameboard.getCellElementRowCol(3,2).innerText = 'X'
    gameboard.getCellElementRowCol(3,4).innerText = 'X'
    gameboard.getCellElementRowCol(3,5).innerText = 'X'
    gameboard.getCellElementRowCol(1,1).innerText = 'X'
    gameboard.getCellElementRowCol(2,2).innerText = 'X'
    gameboard.getCellElementRowCol(4,4).innerText = 'X'
    gameboard.getCellElementRowCol(5,5).innerText = 'X'
    gameboard.getCellElementRowCol(1,3).innerText = 'X'
    gameboard.getCellElementRowCol(2,3).innerText = 'X'
    gameboard.getCellElementRowCol(4,3).innerText = 'X'
    gameboard.getCellElementRowCol(5,3).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(5)
  })

  it ('should return the longest line of cells that match the value of the clicked cell', () => {
    const cell = gameboard.getCellElementRowCol(2,3)
    cell.innerText = 'X'
    gameboard.getCellElementRowCol(1,1).innerText = 'o'
    gameboard.getCellElementRowCol(1,2).innerText = 'o'
    gameboard.getCellElementRowCol(1,3).innerText = 'o'
    gameboard.getCellElementRowCol(1,4).innerText = 'o'
    gameboard.getCellElementRowCol(1,5).innerText = 'o'
    gameboard.getCellElementRowCol(2,1).innerText = 'X'
    gameboard.getCellElementRowCol(2,2).innerText = 'X'
    gameboard.getCellElementRowCol(2,4).innerText = 'X'
    gameboard.getCellElementRowCol(2,5).innerText = 'X'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(5)
  })

  it ('should return the longest line of cells that match the value of the clicked cell', () => {
    const cell = gameboard.getCellElementRowCol(4,5)
    cell.innerText = 'o'
    gameboard.getCellElementRowCol(1,2).innerText = 'o'
    gameboard.getCellElementRowCol(2,3).innerText = 'o'
    gameboard.getCellElementRowCol(3,4).innerText = 'o'
    const mxa = new MatrixAnalyzer(gameboard)
    const longestLine = mxa.getLongestMatchingLineIntersectingCell(cell)
    expect(longestLine.length).toBe(4)
  })

})
