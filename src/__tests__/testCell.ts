/**
 * @jest-environment jsdom
 */
import { Cell } from './../lib/Cell';
import { Point2D } from './../lib/Point2D'
import { CellSizeWidthHeight } from './../lib/CellSizeWidthHeight'

describe('Cell', () => {
  let position:Point2D
  let cellSize:CellSizeWidthHeight
  let cell:Cell
  let x:number = 3
  let y:number = 4
  let width:number = 10
  let height:number = 11

  beforeEach(() => {
    position = new Point2D(x, y)
    cellSize = new CellSizeWidthHeight(width, height)
    cell = new Cell(position,cellSize)
  })

  it('should create a new cell-object', () => {
    expect(cell).toBeInstanceOf(Cell)
  })

  it('should create a new cell-object', () => {
    expect(cell).toBeInstanceOf(Cell)
    expect(cell.point).toBeInstanceOf(Point2D)
    expect(cell.size).toBeInstanceOf(CellSizeWidthHeight)
  })

  it('should correctly set position and cellSize values', () => {
    expect(cell.point).toBe(position)
    expect(cell.size).toBe(cellSize)
  })
})
