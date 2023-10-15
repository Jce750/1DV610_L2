/**
 * @jest-environment jsdom
 */
import { Cell } from '../Cell';
import { PositionRowColumn } from '../PositionRowColumn'
import { CellSizeWidthHeight } from '../CellSizeWidthHeight'

describe('Cell', () => {
  let position:PositionRowColumn
  let cellSize:CellSizeWidthHeight
  let cell:Cell
  let row:number = 3
  let col:number = 4
  let width:number = 10
  let height:number = 11

  beforeEach(() => {
    position = new PositionRowColumn(row,col)
    cellSize = new CellSizeWidthHeight(width,height)
    cell = new Cell(position,cellSize)
  })

  it('should create a new cell-object', () => {
    expect(cell).toBeInstanceOf(Cell)
  })

  it('should create a new cell-object', () => {
    expect(cell).toBeInstanceOf(Cell)
    expect(cell.position).toBeInstanceOf(PositionRowColumn)
    expect(cell.size).toBeInstanceOf(CellSizeWidthHeight)
  })

  it('should correctly set position and cellSize values', () => {
    expect(cell.position).toBe(position)
    expect(cell.size).toBe(cellSize)
  })
})
