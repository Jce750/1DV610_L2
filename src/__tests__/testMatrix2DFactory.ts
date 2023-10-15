/**
 * @jest-environment jsdom
 */
import { Matrix2DFactory } from '../Matrix2DFactory';
import { MatrixSizeRowsCols } from '../MatrixSizeRowsCols';
import { MagicData } from '../MagicData';
import { Cell } from '../Cell';
import { PositionRowColumn } from '../PositionRowColumn';
import { CellSizeWidthHeight } from '../CellSizeWidthHeight';
import { GameBoardHtmlFactory } from '../GameBoardHtmlFactory';

describe('Matrix2DFactory', () => {
  let factory: Matrix2DFactory;
  let document: Document;

  beforeEach(() => {
    factory = new Matrix2DFactory();
  });

  describe('buildMatrix2DfromScratch', () => {

    it('should build a new cell object that fit in matrix', () => {
      const position = new PositionRowColumn(1, 1);
      const cell = factory.createCellAtPosition(position, new MatrixSizeRowsCols(3, 3));
      expect(cell).toBeInstanceOf(Cell);
      expect(cell.position).toBe(position);
      expect(cell.size).toBeInstanceOf(CellSizeWidthHeight);
      expect(cell.size.width).toBe(10);
      expect(cell.size.height).toBe(10);
      expect(cell.value).toBe('');
      expect(cell.position.row).toBe(1);
      expect(cell.position.column).toBe(1);
    })


    it('should build a matrix with the correct size', () => {
      const size = new MatrixSizeRowsCols(3, 3);
      const matrix = factory.buildMatrix2DFromScratch(size);
      expect(matrix.size.rows).toBe(3);
      expect(matrix.size.columns).toBe(3);
      expect(matrix.cells.length).toBe(9);
    });

    it('should throw an error for invalid row size', () => {
      expect(() => factory.buildMatrix2DFromScratch(new MatrixSizeRowsCols(MagicData.MinRows - 1, 3))).toThrow();
    });

    it('should throw an error for invalid column size', () => {
      expect(() => factory.buildMatrix2DFromScratch(new MatrixSizeRowsCols(3, MagicData.MinColumns - 1))).toThrow();
    });
  });

  describe('buildMatrix2DFromHtml', () => {
    it('should build a matrix from an HTML element', () => {
      const htmlFactory = new GameBoardHtmlFactory();
      const htmlGameboard = htmlFactory.createGameBoardHTML(new MatrixSizeRowsCols(2, 2), new CellSizeWidthHeight(100, 100));
      const matrix = factory.buildMatrix2DFromHtml(htmlGameboard);
      expect(matrix.size.rows).toBe(2);
      expect(matrix.size.columns).toBe(2);
    });
  });

  it('should create a Cell from an HTML element', () => {
    const htmlFactory = new GameBoardHtmlFactory();
    const htmlCell = htmlFactory.createCellHtmlElement(new PositionRowColumn(1, 2), new CellSizeWidthHeight(100, 200));
    const cell = factory.createCellFromHtmlCellElement(htmlCell);
    expect(cell).toBeInstanceOf(Cell);
  });

  it('should create an array of Cells from an array of HTML elements', () => {
    // Create an array of mock HTML elements
    const htmlFactory = new GameBoardHtmlFactory();
    const mockElements = [
      htmlFactory.createCellHtmlElement(new PositionRowColumn(1, 1), new CellSizeWidthHeight(100, 200)),
      htmlFactory.createCellHtmlElement(new PositionRowColumn(1, 2), new CellSizeWidthHeight(100, 200)),
      htmlFactory.createCellHtmlElement(new PositionRowColumn(2, 1), new CellSizeWidthHeight(100, 200)),
      htmlFactory.createCellHtmlElement(new PositionRowColumn(2, 2), new CellSizeWidthHeight(100, 200))
    ];

    // Call the method
    const cells = factory.createCellsFromHtmlCellElements(mockElements);

    expect(cells.length).toBe(4);
    validateCell(cells[0], 1, 1, 100, 200);
    validateCell(cells[1], 1, 2, 100, 200);
    validateCell(cells[2], 2, 1, 100, 200);
  });

  // Helper function to validate a Cell object
  function validateCell(cell:Cell, row:number, col:number, width:number, height:number) {
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.position).toBeInstanceOf(PositionRowColumn);
    expect(cell.position.row).toBe(row);
    expect(cell.position.column).toBe(col);
    expect(cell.size).toBeInstanceOf(CellSizeWidthHeight);
    expect(cell.size.width).toBe(width);
    expect(cell.size.height).toBe(height);
  }
})
