import { HtmlGameBoardActions } from '../HtmlGameBoardActions';
import { PositionRowColumn } from '../PositionRowColumn';
import { Point2D } from '../Point2D';
import { PointsSelectionNode } from '../PointsSelectionNode';
import { Matrix2D } from '../Matrix2D';
import { Matrix2DFactory } from '../Matrix2DFactory';
import { MatrixSizeRowsCols } from '../MatrixSizeRowsCols';
import { GameBoardHtmlFactory } from '../GameBoardHtmlFactory';
import { CellSizeWidthHeight } from '../CellSizeWidthHeight';

describe('HtmlGameBoardActions', () => {
  let gameBoardActions: HtmlGameBoardActions;
  let gameBoardElement: HTMLElement;
  let mockClickHandler: jest.Mock;

  beforeEach(() => {
    gameBoardActions = new HtmlGameBoardActions();
    gameBoardElement = document.createElement('div');
    mockClickHandler = jest.fn();
    
    // Create a mock game board
    gameBoardElement = document.createElement('div');
    // Create mock cells
    for (let row = 1; row <= 3; row++) {
      for (let col = 1; col <= 3; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row.toString());
        cell.setAttribute('data-col', col.toString());
        gameBoardElement.appendChild(cell);
      }
    }
  });

  it('should return the correct cell element', () => {
    const position = new PositionRowColumn(2, 2);
    const cellElement = gameBoardActions.getCellElementAtPosition(position, gameBoardElement);
    
    expect(cellElement.getAttribute('data-row')).toBe('2');
    expect(cellElement.getAttribute('data-col')).toBe('2');
  });

  it('should throw an error if row or column is out of range', () => {
    const position = new PositionRowColumn(4, 4);
    
    expect(() => {
      gameBoardActions.getCellElementAtPosition(position, gameBoardElement);
    }).toThrow('row or column out of range');
  });

  it('should throw an error if element is not found', () => {
    const position = new PositionRowColumn(2, 2);
    gameBoardElement.innerHTML = '';  // Clear the game board
    
    expect(() => {
      gameBoardActions.getCellElementAtPosition(position, gameBoardElement);
    }).toThrow('element not found');
  });

  it('should return the correct cell inner text', () => {
    const position = new PositionRowColumn(2, 2);
    const cellElement = gameBoardActions.getCellElementAtPosition(position, gameBoardElement);
    cellElement.innerText = 'Test Value';
    
    const cellValue = gameBoardActions.getCellHtmlElementValueAtPosition(position, gameBoardElement);
    expect(cellValue).toBe('Test Value');
  });

  it('should throw an error if row or column is out of range when getting inner text', () => {
    const position = new PositionRowColumn(4, 4);
    
    expect(() => {
      gameBoardActions.getCellHtmlElementValueAtPosition(position, gameBoardElement);
    }).toThrow('row or column out of range');
  });

  it('should throw an error if element is not found when getting inner text', () => {
    const position = new PositionRowColumn(2, 2);
    gameBoardElement.innerHTML = '';  // Clear the game board
    
    expect(() => {
      gameBoardActions.getCellHtmlElementValueAtPosition(position, gameBoardElement);
    }).toThrow('element not found');
  });

  it('should add click event to a single cell', () => {
    const position = new PositionRowColumn(1, 1);
    const cellElement = gameBoardActions.getCellElementAtPosition(position, gameBoardElement);

    gameBoardActions.addClickEventToCell(cellElement, mockClickHandler);
    cellElement.click();

    expect(mockClickHandler).toHaveBeenCalled();
  });

  it('should add click events to multiple cells', () => {
    const selection = new PointsSelectionNode(0,0);
    selection.add(new Point2D(1, 1));
    selection.add(new Point2D(2, 2));

    gameBoardActions.addClickEventToHtmlElementCells(selection, mockClickHandler, gameBoardElement);

    gameBoardElement.querySelectorAll('.cell').forEach(cell => {
      //cell.click();
      cell.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockClickHandler).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if onclick is not a function', () => {
    const cellElement = gameBoardActions.getCellElementAtPosition(new PositionRowColumn(1, 1), gameBoardElement);

    expect(() => {
      gameBoardActions.addClickEventToCell(cellElement, 'notAFunction' as any);
    }).toThrow('onclick must be a function');
  });

  it('should update HTML matrix by Matrix2D', () => {
    const matrix4Test = new Matrix2DFactory().
      buildMatrix2DfromScratch(new MatrixSizeRowsCols(3,3))
    const htmlMatrix = new GameBoardHtmlFactory()
    .createGameBoardHTML(new MatrixSizeRowsCols(3,3), new CellSizeWidthHeight(50,50))
    matrix4Test.cells.forEach(cell => {
      cell.value = 'A'
    })

    gameBoardActions.updateHtmlMatrixByMatrix(matrix4Test, htmlMatrix);

    // Verify that the HTML elements were updated correctly
    matrix4Test.cells.forEach(cell => {
      const cellElement:HTMLElement | null = htmlMatrix.querySelector(`[data-row="${cell.position.row}"][data-col="${cell.position.column}"]`);
      if (!cellElement ) {
        throw new Error('cell element not found');
      }
      expect(cellElement.innerText).toBe(cell.value.toString());
      expect(cellElement.style.width).toBe(`${cell.cellSize.width}px`);
      expect(cellElement.style.height).toBe(`${cell.cellSize.height}px`);
    });
  });
});