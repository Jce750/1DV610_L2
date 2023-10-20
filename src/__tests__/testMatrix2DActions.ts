import { Matrix2DFactory } from './../lib/Matrix2DFactory';
import { MatrixSizeRowsCols } from './../lib/MatrixSizeRowsCols';
import { Matrix2D } from './../lib/Matrix2D';
import { Point2D } from './../lib/Point2D';
import { Matrix2DActions } from './../lib/Matrix2DActions';

describe('Matrix2DActions', () => {
  let factory: Matrix2DFactory;
  let matrix: Matrix2D;
  let actions: Matrix2DActions;

  beforeEach(() => {
    factory = new Matrix2DFactory();
    actions = new Matrix2DActions();
    matrix= actions.buildMatrix2DFromScratch(new MatrixSizeRowsCols(5, 5));
  });


  it ('should build a matrix with the correct size', () => {
    const size = new MatrixSizeRowsCols(3, 3);
    const matrix = factory.buildMatrix2DFromScratch(size);
    expect(matrix.size.rows).toBe(3);
    expect(matrix.size.columns).toBe(3);
    expect(matrix.cells.length).toBe(9);
    expect(matrix.cells[0].point.y).toBeDefined();
    expect(matrix.cells[0].point.x).toBeDefined();
  });

  it('should set the cell value at a given position', () => {
    const position = new Point2D(1, 1);
    console.log(position)
    console.log(matrix.cells.length)
    console.log(actions)
    const value = 'X';
    actions.setCellValueAtPosition(position, matrix, value);
    const cellValue = actions.getCellValueAtPosition(position, matrix);
    //const cell = matrix.cells.find(cell => cell.position.column == position.x && cell.position.row === position.y);
    expect(cellValue).toBeDefined();
    //if (cell) {
      expect(cellValue).toBe(value);
    //}
  });

  it('should throw an error if the cell is not found', () => {
    const position = new Point2D(6, 6); // Out of bounds
    const value = 'X';

    expect(() => {
      actions.setCellValueAtPosition(position, matrix, value);
    }).toThrow('position does not exist in matrix');
  })

  it.only ('should return the longest line of cells that match the value of the cell at point', () => {
    actions.setCellValueAtPosition(new Point2D(1,1), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,2), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,3), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,4), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,5), matrix, 'X')
    const cellValue11 = actions.getCellValueAtPosition(new Point2D(1,1), matrix)
    const cellValue12 = actions.getCellValueAtPosition(new Point2D(1,2), matrix)
    const cellValue13 = actions.getCellValueAtPosition(new Point2D(1,3), matrix)
    const cellValue14 = actions.getCellValueAtPosition(new Point2D(1,4), matrix)
    const cellValue15 = actions.getCellValueAtPosition(new Point2D(1,5), matrix)
    expect(cellValue11).toBe('X')
    expect(cellValue12).toBe('X')
    expect(cellValue13).toBe('X')
    expect(cellValue14).toBe('X')
    expect(cellValue15).toBe('X')
    const itemsFoundCount = actions.getLongestCellElementLineOfValueMatchIntersectingCells(new Point2D(1,1), matrix).length
    expect(itemsFoundCount).toBe(5)
    const points = actions.getLongestCellElementLineOfValueMatchIntersectingCells(new Point2D(1,1), matrix)
    console.log(points)
    expect(points[0].x).toBe(1)
    expect(points[0].y).toBe(2)
    expect(points[1].x).toBe(1)
    expect(points[1].y).toBe(3)
    expect(points[2].x).toBe(1)
    expect(points[2].y).toBe(4)
  })

  it ('should return the longest line of cells that match the value of the clicked cell even when added in the middle', () => {
    actions.setCellValueAtPosition(new Point2D(1,1), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,2), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,3), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,4), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(1,5), matrix, 'X')
    const itemsFoundCount = actions.getLongestCellElementLineOfValueMatchIntersectingCells(new Point2D(1,3), matrix).length
    expect(itemsFoundCount).toBe(5)
  })

  it ('should return the longest diagonal line of cells that match the value of the clicked cell even when added in the middle', () => {
    actions.setCellValueAtPosition(new Point2D(1,1), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(2,2), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(3,3), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(4,4), matrix, 'X')
    actions.setCellValueAtPosition(new Point2D(5,5), matrix, 'X')
    const itemsFoundCount = actions.getLongestCellElementLineOfValueMatchIntersectingCells(new Point2D(1,1), matrix).length
    expect(itemsFoundCount).toBe(5)
  })
})