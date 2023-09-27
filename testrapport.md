# Test Report

## Summary

- **Date**: 2023-09-27
- **Test Frame**: Jest with the jsdom environment
- **Test Suites**: 6 passed, 6 total
- **Tests**: 45 passed, 45 total
- **Snapshots**: 0 total
- **Time**: 7.5 s

---

## Test Suites

### 1. RangeMinMax

- [x] should correctly set min and max values (12 ms)
- [x] should throw an error if min is greater than max (13 ms)
- [x] should throw an error if min is equal to max (3 ms)
- [x] should throw an error if min is not a number (1 ms)
- [x] should throw an error if max is not a number (12 ms)
- [x] should throw an error if min is not greater than 0 (28 ms)
- [x] should throw an error if min is not an integer (2 ms)
- [x] should throw an error if min is not finite (3 ms)
- [x] should throw an error if value is less than min (122 ms)
- [x] should throw an error if value is greater than max (3 ms)

### 3. CellSizeWidthHeight

- [x] should correctly set min and max values (14 ms)
- [x] should throw an error if width or height is not a number (16 ms)
- [x] should throw an error if width or height is less than 0 (5 ms)
- [x] should throw an error if width or height is not an integer (2 ms)
- [x] should throw an error if width or height is not finite (2 ms)

### 4. MatrixSizeRowsCols

- [x] should correctly set row and column values (31 ms)
- [x] should throw an error if row or column is not a number (31 ms)
- [x] should throw an error if row or column is less than 0 (2 ms)
- [x] should throw an error if row or column is not an integer (1 ms)
- [x] should throw an error if expect(() => new MatrixSizeRowsCols(1.5, 10)).toThrow() is not finite (2 ms)

### 5. PositionRowColumn

- [x] should correctly set row and column values (3 ms)
- [x] should throw an error if row or column is not a number (23 ms)
- [x] should throw an error if row or column is less than 0 (1 ms)
- [x] should throw an error if row or column is not an integer (2 ms)
- [x] should throw an error if expect(() => new PositionRowColumn(1.5, 10)).toThrow() is not finite (1 ms)

### 6. Cell

- [x] should create a new cell-object (33 ms)
- [x] should create a new cell-object (2 ms)
- [x] should correctly set position and cellSize values (2 ms)
- [x] should set the correct attributes on the cell element (1 ms)

### 7. GameBoard

- [x] should create a gameboard with 5 rows and 5 columns (27 ms)
- [x] should throw an error if rows is less than 1 (88 ms)
- [x] should create a gameboard with 10px width and height cells (8 ms)
- [x] should contain a gameboard element (11 ms)
- [x] should contain 25 HTMLElements (11 ms)
- [x] should return a cell element for a given row and column (10 ms)
- [x] should throw an error if row is less than 1 (6 ms)
- [x] should return a cell element value for a given row and column (4 ms)
- [x] should count the number of cells that have been clicked (10 ms)
- [x] should return the longest line of cells that match the value of the clicked cell (12 ms)
- [x] should return the longest line of cells that match the value of the clicked cell even when added in the middle (6 ms)
- [x] should return the longest diagonal line of cells that match the value of the clicked cell even when added in the middle (6 ms)
- [x] should return the longest line of cells that match the value of the clicked cell (6 ms)
- [x] should return the longest line of cells that match the value of the clicked cell (11 ms)
- [x] should return the longest line of cells that match the value of the clicked cell (15 ms)
- [x] should return the longest line of cells that match the value of the clicked cell (4 ms)

---

**Test Suites**: 6 passed, 6 total  
**Tests**: 45 passed, 45 total  
**Snapshots**: 0 total  
**Time**: 7.5 s  
**Ran all test suites.**
