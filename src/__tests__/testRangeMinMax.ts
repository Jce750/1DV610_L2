import { RangeMinMax } from '../RangeMinMax' // Adjust the import path as needed

describe('RangeMinMax', () => {
  it('should correctly set min and max values', () => {
    const range = new RangeMinMax(1, 10)
    expect(range.min).toBe(1)
    expect(range.max).toBe(10)
  })

  it('should throw an error if min is greater than max', () => {
    expect(() => new RangeMinMax(10, 1)).toThrow()
  })

  it('should throw an error if min is equal to max', () => {
    expect(() => new RangeMinMax(1, 1)).toThrow()
  })

  it('should throw an error if min is not a number', () => {
    expect(() => new RangeMinMax(NaN, 10)).toThrow()
  })

  it('should throw an error if max is not a number', () => {
    expect(() => new RangeMinMax(1, NaN)).toThrow()
  })

  it('should throw an error if min is not finite', () => {
    expect(() => new RangeMinMax(Infinity, 10)).toThrow()
  })

  it('should throw an error if value is less than min', () => {
    const range = new RangeMinMax(1, 10)
    expect(() => range.checkValueInRange(0)).toThrow()
  })

  it('should throw an error if value is greater than max', () => {
    const range = new RangeMinMax(1, 10)
    expect(() => range.checkValueInRange(11)).toThrow()
  })

})