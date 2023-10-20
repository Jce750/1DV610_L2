/**
 * @jest-environment jsdom
 */

import { GameBoardHtmlActions } from './../lib/GameBoardHtmlActions';
import { Point2D } from './../lib/Point2D';
import { PointsSelectionNode } from './../lib/PointsSelectionNode';
import { Matrix2DFactory } from './../lib/Matrix2DFactory';
import { MatrixSizeRowsCols } from './../lib/MatrixSizeRowsCols';
import { GameBoardHtmlFactory } from './../lib/GameBoardHtmlFactory';
import { CellSizeWidthHeight } from './../lib/CellSizeWidthHeight';

describe('GameBoardHtmlActions', () => {
  let gameBoardActions: GameBoardHtmlActions;
  let gameBoardElement: HTMLElement;
  let mockClickHandler: jest.Mock;

  beforeEach(() => {
    gameBoardActions = new GameBoardHtmlActions();
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
    const point = new Point2D(2, 2);
    if (!gameBoardElement) {
      throw new Error('game board element not found');
    }
    const cellElement = gameBoardActions.getCellHtmlElementAtPoint(point, gameBoardElement);

    expect(cellElement.getAttribute('data-row')).toBe('2');
    expect(cellElement.getAttribute('data-col')).toBe('2');
  });

  it('should throw an error if element is not found', () => {
    const point = new Point2D(2, 2);
    gameBoardElement.innerHTML = '';  // Clear the game board

    expect(() => {
      gameBoardActions.getCellHtmlElementAtPoint(point, gameBoardElement);
    }).toThrow();
  });

  it('should return the correct cell inner text', () => {
    const point = new Point2D(2, 2);
    const cellElement = gameBoardActions.getCellHtmlElementAtPoint(point, gameBoardElement);
    cellElement.innerText = 'Test Value';

    const cellValue = gameBoardActions.getCellHtmlElementValueAtPoint(point, gameBoardElement);
    expect(cellElement).toBeDefined();
    expect(cellElement.innerText).toBe('Test Value');
    expect(cellValue).toBeDefined();
    expect(cellValue).toBe('Test Value');
  });

  it('should throw an error if row or column is out of range when getting inner text', () => {
    const point = new Point2D(4, 4);

    expect(() => {
      gameBoardActions.getCellHtmlElementValueAtPoint(point, gameBoardElement);
    }).toThrow();
  });

  it('should throw an error if element is not found when getting inner text', () => {
    const point = new Point2D(2, 2);
    gameBoardElement.innerHTML = '';  // Clear the game board

    expect(() => {
      gameBoardActions.getCellHtmlElementValueAtPoint(point, gameBoardElement);
    }).toThrow();
  });

  it('should add click event to a single cell', () => {
    const point = new Point2D(1, 1);
    const cellElement = gameBoardActions.getCellHtmlElementAtPoint(point, gameBoardElement);

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
    const cellElement = gameBoardActions.getCellHtmlElementAtPoint(new Point2D(1, 1), gameBoardElement);

    expect(() => {
      gameBoardActions.addClickEventToCell(cellElement, 'notAFunction' as any);
    }).toThrow('onclick must be a function');
  });

  it('should update HTML matrix by Matrix2D', () => {
    const matrix4Test = new Matrix2DFactory().buildMatrix2DFromScratch(new MatrixSizeRowsCols(3,3))
    const htmlMatrix = new GameBoardHtmlFactory()
    .createGameBoardHtml(new MatrixSizeRowsCols(3,3), new CellSizeWidthHeight(50,50))
    matrix4Test.cells.forEach(cell => {
      cell.value = 'A'
    })

    gameBoardActions.updateHtmlMatrixByMatrix(matrix4Test, htmlMatrix);

    // Verify that the HTML elements were updated correctly
    matrix4Test.cells.forEach(cell => {
      const cellElement:HTMLElement | null = htmlMatrix.querySelector(`[data-row="${cell.point.y}"][data-col="${cell.point.x}"]`);
      if (!cellElement ) {
        throw new Error('cell element not found');
      }
      expect(cellElement.innerText).toBe(cell.value.toString());
      expect(cellElement.style.width).toBe(`${cell.size.width}px`);
      expect(cellElement.style.height).toBe(`${cell.size.height}px`);
    });
  });

  it('should select all cells in the game board', () => {
    const selection = gameBoardActions.selectAllCellsPointsInHtmlElement(gameBoardElement);

    const selectedPoints:Point2D[] = [];
    selection.forEach((point) => {
      selectedPoints.push(point);
    });

    expect(selectedPoints.length).toBe(9); // 3 rows * 3 columns = 9 cells

    // Check if all points are in the selection
    for (let row = 1; row <= 3; row++) {
      for (let col = 1; col <= 3; col++) {
        expect(selectedPoints).toContainEqual(new Point2D(col, row));
      }
    }
  });
});