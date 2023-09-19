# GameBoard Library
This is a game-builder and management library.
See an extensive example of use in the demo-app
at:
  https://github.com/Jce750/1DV610_L2_Demo.
The main implementation can be found in:
  /src/js/components/x-tictactoe/tictactoe.js

In general it is good to know that the librarys intended use is to create a rectangular 2D game board object. It consists of equally sized rectangular cells. The cells can have a click function and a text content. It is meant to be like a controller for a HTML game board-element and game.
It has a game analysis tool that can evaluate game-state.

## Installation
In your library-folder, open a command prompt.
To download a copy of the library run:
git clone https://github.com/Jce750/1DV610_L2

open the project in Visual Studio Code and open a terminal.
To install dependencies run:
npm install

Since the library is not published on npm you can manually point to the library from the package.json of your app that will use it.
Under dependencies in package.json add:
"matrixanalysislibrary": "../../L1_MatrixAnalysisLibrary",


## Use library
To include the library in your class or webcomponent, add the following at the top of your file:
import { GameBoard } from './../../../../node_modules/matrixanalysislibrary/dist/GameBoard.js'
the path must be adjusted depending on the structure of your folders.

Create an instance of GameBoard:
const gameBoard = new GameBoard(5,5)
The gameBoard object has access to some nice functionality see below.

## Tests
In Visual Studio Code open terminal and run:
npm test
Tests are available in /src/__tests__

### Public functionality:
An instance of GameBoard will offer the following:

Properties:
- size returns MatrixSizeRowsCols
  currentRowSize = gameBoard.size.rowsSize
  gameBoard.size.rowsSize = 10
  currentColumnSize = gameBoard.size.columnsSize
  gameBoard.size.columnsSize = 10

- cellSize returns CellSizeWidthHeight
  currentCellWidth = gameBoard.cellSize.width
  gameBoard.cellSize.width = 10
  currentCellHeight = gameBoard.cellSize.height
  gameBoard.cellSize.height = 10

- element returns HTMLElement
  cellElements():NodeListOf<Element>
    this.#gameboardElement.appendChild(this.#gameboard.element) 
  

- updateCellWidthHeight(width:number,height:number):void lets you update the size of the board cells.
    gameBoard.updateCellWidthHeight(20,30)

- addclickEventToCells(cellElements:HTMLCollection, onclick: (event: MouseEvent) => void):void lets you add a clickevent to each cell in cellElements. You can pass a tailored event method as the second argument.
    this.#gameboard.addclickEventToCells(this.#gameboard.cellElements, this.boundHandleClick)
    Can be used in conjunction with:
    cells.forEach(cell => {
      cell.removeEventListener('click', this.boundHandleClick)
    })

- getCellElementRowCol(row:number,col:number):HTMLElement retrieves the specified Html       cell-element
    gameBoard.getCellElementRowCol(3,4)

- getCellElementValueRowCol(row:number,col:number):string retrieves the HTML textContent of the specified cell
    gameBoard.getCellElementValueRowCol(3,4)

- getLongestCellLineOfValueMatchIntersectingCell(currentCell:HTMLElement):HTMLElement[] gives you the longest line of cells intersecting the specified cell with values that match that cell. Typical use would be to test for a winner in a tic-tac-toe game.
  const aligned = gameBoard.getLongestCellLineOfValueMatchIntersectingCell(currentCell)

## Limits:
Limits can be adjusted by editing the enum Limits in Limits.ts

## Default values:
Gameboard size: rows = 5, columns = 5  
Cell size: width: 20px, height: 20px  
Position defualt: rows = 1, column = 1  
