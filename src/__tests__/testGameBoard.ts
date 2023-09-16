import { GameBoard } from "../GameBoard";
import { Limits } from "../Limits";

describe('GameBoard', () => {
  let gameboard:GameBoard

  beforeEach(() => {
      gameboard = new GameBoard(5,5)
  })

  it ('should create a gameboard with 5 rows and 5 columns', () => {
    expect(gameboard.size.rows).toBe(5)
    expect(gameboard.size.columns).toBe(5)
  })
  
  it ('should throw an error if rows is less than 1', () => {
    expect(() => new GameBoard(0,5)).toThrow('row or column out of range')
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
    const cellElementValue = gameboard.getCellElementValueRowCol(1,1)
    expect(cellElementValue).toBe('1,1')
  })

})
