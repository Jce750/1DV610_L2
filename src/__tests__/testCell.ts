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
    expect(cell.cellSize).toBeInstanceOf(CellSizeWidthHeight)
    expect(cell.CellElement).toBeInstanceOf(HTMLElement)
  })

  it('should correctly set position and cellSize values', () => {
    expect(cell.position).toBe(position)
    expect(cell.cellSize).toBe(cellSize)
  })

  it('should set the correct attributes on the cell element', () => {
    expect(cell.CellElement.getAttribute('data-row')).toBe(row.toString())
    expect(cell.CellElement.getAttribute('data-col')).toBe(col.toString())
    expect(cell.CellElement.style.width).toBe(`${width}px`)
    expect(cell.CellElement.style.height).toBe(`${height}px`)
  })
})
