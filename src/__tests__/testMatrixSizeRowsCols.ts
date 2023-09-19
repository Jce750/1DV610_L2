import { MatrixSizeRowsCols } from '../MatrixSizeRowsCols' // Adjust the import path as needed

describe('MatrixSizeRowsCols', () => {
  it('should correctly set row and column values', () => {
    const size = new MatrixSizeRowsCols(1, 10)
    expect(size.rowsSize).toBe(1)
    expect(size.columnsSize).toBe(10)
  })

  it('should throw an error if row or column is not a number', () => {
    expect(() => new MatrixSizeRowsCols(NaN, 10)).toThrow()
    expect(() => new MatrixSizeRowsCols(10, NaN)).toThrow()
  })

  it('should throw an error if row or column is not greater than 0', () => {
    expect(() => new MatrixSizeRowsCols(0, 10)).toThrow()
    expect(() => new MatrixSizeRowsCols(10, 0)).toThrow()
  })

  it('should throw an error if row or column is not an integer', () => {
    expect(() => new MatrixSizeRowsCols(1.5, 10)).toThrow()
    expect(() => new MatrixSizeRowsCols(10, 1.5)).toThrow()
  })

  it('should throw an error if expect(() => new MatrixSizeRowsCols(1.5, 10)).toThrow() is not finite', () => {
    expect(() => new MatrixSizeRowsCols(Infinity, 10)).toThrow()
    expect(() => new MatrixSizeRowsCols(10, Infinity)).toThrow()
  })
})
