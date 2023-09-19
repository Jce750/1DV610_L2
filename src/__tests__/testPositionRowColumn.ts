import { PositionRowColumn } from '../PositionRowColumn' // Adjust the import path as needed

describe('PositionRowColumn', () => {
  it('should correctly set row and column values', () => {
    const position = new PositionRowColumn(1, 10)
    expect(position.row).toBe(1)
    expect(position.column).toBe(10)
  })

  it('should throw an error if row or column is not a number', () => {
    expect(() => new PositionRowColumn(NaN, 10)).toThrow()
    expect(() => new PositionRowColumn(10, NaN)).toThrow()
  })

  it('should throw an error if row or column is not greater than 0', () => {
    expect(() => new PositionRowColumn(0, 10)).toThrow()
    expect(() => new PositionRowColumn(10, 0)).toThrow()
  })

  it('should throw an error if row or column is not an integer', () => {
    expect(() => new PositionRowColumn(1.5, 10)).toThrow()
    expect(() => new PositionRowColumn(10, 1.5)).toThrow()
  })

  it('should throw an error if expect(() => new PositionRowColumn(1.5, 10)).toThrow() is not finite', () => {
    expect(() => new PositionRowColumn(Infinity, 10)).toThrow()
    expect(() => new PositionRowColumn(10, Infinity)).toThrow()
  })
})
