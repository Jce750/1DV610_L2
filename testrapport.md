# Test Report

## Manual tests based on requirements

  1. Test manually the possibility to work with a set of functions through facade interfaces by playing the game using the demo app referred to in the readme.
  
  2. Test that the library will offer functionality for general 2D matrix work by adding this:

      const tabort = this.#gameBoardLibrary.createMatrixByRowsColumns({ rows: this.#sideSize, columns: this.#sideSize })
      tabort.cells[0].width = 100
      console.log('FFFFFFF', tabort)
      console.log('FFFFFFF', tabort.cells[0].width) // 100

      to the #createGameBoard () method in the demo app.
      the result should be
      - a matrix Html
      - 100

  3. Test that the library will offer specialized functionality to work with Html matrices by playing the game using the demo app referred to in the readme.

  4. The general functionality does not depend on the specific. Review the code and make sure there are no dependencies or associations from the general classes to the specialized ones.

  5. The library will offer functionality to convert between general and html matrix. Covered by automatic tests.

  6. The library functions can be accessed stateless. Review the code and check that no methods rely on saved data.

  Test 1-6 passed the tested.

  ## Automatic tests

# Test Report Table

## Test Results

| Test File                    | Test Description                                         | Test Outcome | Execution Time |
|------------------------------|----------------------------------------------------------|--------------|----------------|
| `src/__tests__/testPositionRowColumn.ts` | should correctly set row and column values              | √            | 15 ms          |
|                              | should throw an error if row or column is not a number   | √            | 29 ms          |
|                              | should throw an error if row or column is less than 0    | √            | 2 ms           |
|                              | should throw an error if row or column is not an integer | √            | 2 ms           |
|                              | should throw an error if value is not finite             | √            | 9 ms           |


| Test File                                | Test Description                                         | Test Outcome | Execution Time |
|------------------------------------------|----------------------------------------------------------|--------------|----------------|
| `src/__tests__/testRangeMinMax.tss.ts`    | should correctly set min and max values                  | √            | 29 ms          |
|                                          | should throw an error if min is greater than max         | √            | 20 ms          |
|                                          | should throw an error if min is equal to max             | √            | 1 ms           |
|                                          | should throw an error if min is not a number             | √            | 2 ms           |
|                                          | should throw an error if max is not a number             | √            | 1 ms           |
|                                          | should throw an error if min is not finite               | √            | 1 ms           |
|                                          | should throw an error if value is less than min          | √            | N/A            |
|                                          | should throw an error if value is greater than max       | √            | N/A            |
| `src/__tests__/testMatrixSizeRowsCols.ts` | should correctly set row and column values               | √            | 6 ms           |
|                                          | should throw an error if row or column is not a number   | √            | 21 ms          |
|                                          | should throw an error if row or column is less than 0    | √            | 2 ms           |
|                                          | should throw an error if row or column is not an integer | √            | 2 ms           |
|                                          | should throw an error if value is not finite             | √            | 1 ms           |
| `src/__tests__/testCellSizeWidthHeight.ts`| should correctly set min and max values                  | √            | 3 ms           |
|                                          | should throw an error if width or height is not a number | √            | 30 ms          |
|                                          | should throw an error if width or height is less than 0  | √            | 3 ms           |
|                                          | should throw an error if width or height is not an integer| √           | 1 ms           |
|                                          | should throw an error if width or height is not finite   | √            | 2 ms           |

| Test File                                  | Test Description                                                                 | Test Outcome | Execution Time |
|--------------------------------------------|----------------------------------------------------------------------------------|--------------|----------------|
| `src/__tests__/testMatrix2DActions.ts`     | should build a matrix with the correct size                                      | √            | 38 ms          |
|                                            | should set the cell value at a given position                                    | √            | 1 ms           |
|                                            | should throw an error if the cell is not found                                   | √            | 30 ms          |
|                                            | should return the longest line of cells that match the value of the cell at point| √            | 5 ms           |
|                                            | should return the longest line of cells that match the value of the clicked cell even when added in the middle| √| 1 ms       |
|                                            | should return the longest diagonal line of cells that match the value of the clicked cell even when added in the middle| √| N/A  |
| `src/__tests__/testGameBoardHtmlAction.ts` | should return the correct cell element                                           | √            | 27 ms          |
|                                            | should throw an error if element is not found                                    | √            | 26 ms          |
|                                            | should return the correct cell inner text                                        | √            | 10 ms          |
|                                            | should throw an error if row or column is out of range when getting inner text  | √            | 3 ms           |
|                                            | should throw an error if element is not found when getting inner text            | √            | 2 ms           |
|                                            | should add click event to a single cell                                          | √            | 2 ms           |
|                                            | should add click events to multiple cells                                        | √            | 5 ms           |
|                                            | should throw an error if onclick is not a function                               | √            | 2 ms           |
|                                            | should update HTML matrix by Matrix2D                                            | √            | 14 ms          |
|                                            | should select all cells in the game board                                        | √            | 4 ms           |
| `src/__tests__/testMatrix2DFactory.ts`     | should create a Cell from an HTML element                                        | √            | 2 ms           |
|                                            | should create an array of Cells from an array of HTML elements                   | √            | 11 ms          |
|                                            | should build a new cell object that fit in matrix                                | √            | 9 ms           |
|                                            | should build a matrix with the correct size                                      | √            | 1 ms           |
|                                            | should throw an error for invalid row size                                       | √            | 15 ms          |
|                                            | should throw an error for invalid column size                                    | √            | 1 ms           |
|                                            | should build a matrix from an HTML element                                       | √            | 15 ms          |
| `src/__tests__/testCell.ts`                | should create a new cell-object                                                  | √            | 3 ms           |
|                                            | should create a new cell-object                                                  | √            | 1 ms           |
|                                            | should correctly set position and cellSize values                                | √            | 1 ms           |
