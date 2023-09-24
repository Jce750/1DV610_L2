import { CellSizeWidthHeight } from '../CellSizeWidthHeight' // Adjust the import path as needed

describe('CellSizeWidthHeight', () => {
  it('should correctly set min and max values', () => {
    const size = new CellSizeWidthHeight(1, 10)
    expect(size.width).toBe(1)
    expect(size.height).toBe(10)
  })

  it('should throw an error if width or height is not a number', () => {
    expect(() => new CellSizeWidthHeight(NaN, 10)).toThrow()
    expect(() => new CellSizeWidthHeight(10, NaN)).toThrow()
  })

  it('should throw an error if width or height is less than 0', () => {
    expect(() => new CellSizeWidthHeight(-1, 10)).toThrow()
    expect(() => new CellSizeWidthHeight(10, -1)).toThrow()
  })

  it('should throw an error if width or height is not an integer', () => {
    expect(() => new CellSizeWidthHeight(1.5, 10)).toThrow()
    expect(() => new CellSizeWidthHeight(10, 1.5)).toThrow()
  })

  it('should throw an error if width or height is not finite', () => {
    expect(() => new CellSizeWidthHeight(Infinity, 10)).toThrow()
    expect(() => new CellSizeWidthHeight(10, Infinity)).toThrow()
  })
})
