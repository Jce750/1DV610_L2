import { PositionRowColumn } from "./PositionRowColumn";
import { PointSelectionComposite } from "./PointSelectionComposite";

export interface IHtmlGameBoardFacade {
  getCellHtmlElementValueAtPosition(position:PositionRowColumn, gameBoardElement:HTMLElement):String
  addClickEventToCell(cellElement:HTMLElement, onclick: ((event: MouseEvent) => void)):void
  addClickEventToHtmlElementCells(selection:PointSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement:HTMLElement):void

}