import { PositionRowColumn } from "./PositionRowColumn";
import { PointsSelectionComposite } from "./PointsSelectionComposite";
import { Matrix2D } from "./Matrix2D";
import { Point2D } from "./Point2D";

export interface IHtmlGameBoardFacade {
  // Get the value of html element at a row and column
  getCellHtmlElementValueAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):String

  // Add click event to a single cell
  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void

  // Select Points on the matrix and add click event to html elements
  addClickEventToHtmlElementCells(selection:PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void

  // Update/synchronize size and value from matrix to html
  updateHtmlMatrixByMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void

  // Update/synchronize size and value from html to matrix
  updateMatrixByHtmlMatrix(matrix:Matrix2D, htmlMatrix:HTMLElement):void

  // Look for the longest line of matching values intersecting the current cell and return the html elements
  // Search along the horisontal, vertical and diagonal lines of the game board
  getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell:Point2D, matrix:Matrix2D, htmlMatrix:HTMLElement):HTMLElement[]
}