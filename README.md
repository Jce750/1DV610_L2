# GameBoard Library

This is a game-builder and management library created with Typescript in Visual Studio Code.

In general it is good to know that the libraries intended use is to create and handle a rectangular 2D game board object. It consists of rectangular cells. When using the library to create the HTML-objects it will index them in order to be able to provide tools for analysis and manipulation. The cells can have a click function and a text content. It is meant to be like a controller for a HTML game board-element and game. It has a game analysis tool that can evaluate game-state. It is an easy way to bring extra functionality to your games without cluttering them with code.

## Demo

See an example of use in the demo-app
at:

  [https://github.com/Jce750/1DV610_L2_Demo](https://github.com/Jce750/1DV610_L2_Demo).

  The main implementation in the demo can be found in:
  /src/js/components/x-tictactoe/tictactoe.js

## Installation

In your library-folder, open a command prompt.
To download a copy of the library run:

```git
git clone https://github.com/Jce750/1DV610_L2
```

Since the library is not published on npm you can manually point to the library from the package.json of your app using it.
Under dependencies in package.json of your app add:

```javascript
"matrixanalysislibrary": "{Your relative path to the library folder}/{Name of library folder}",
```

Lets say you have these folders:  
parentFolder/L1_MatrixAnalysisLibrary  
parentFolder/Your_project

example:

```text
"matrixanalysislibrary": "../../L1_MatrixAnalysisLibrary"
```

then to install dependencies run:

```node
npm install
```

## Use library

To include the library in your class or web component, add the following at the top of your file that will use the library:

```javascript
import { GameBoard } from './{your relative path}/node_modules/matrixanalysislibrary/dist/GameBoard.js'
```

the path must be adjusted depending on the structure of your folders. It is the relative path from your file to the libraries start file situated in the node_modules of your project.

Create an instance of GameBoard:

```javascript
const gameBoard = new GameBoard(5,5)
```

The gameBoard object has access to some nice functionality see below.

## Tests

To run the included tests In Visual Studio Code open terminal and run:

```node
npm run test
```

Tests are available in /src/__tests__

### Public functionality

An instance of GameBoard will offer the following:

## Properties

### `size: MatrixSizeRowsCols`

(read/write)  
This property returns an object of type `MatrixSizeRowsCols` containing two attributes: `rowsSize` and `columnsSize`.

example:

```javascript
  const currentRowSize = gameBoard.size.rowsSize;
  const currentColumnSize = gameBoard.size.columnsSize;
  gameBoard.size.rowsSize = 10
  gameBoard.size.columnsSize = 10
```

### `cellSize: CellSizeWidthHeight`

This getter returns an object of type `CellSizeWidthHeight` containing two attributes: `width` and `height`.

  example:

  ```javascript
  const currentCellWidth = gameBoard.cellSize.width
  const currentCellHeight = gameBoard.cellSize.height
  gameBoard.size.columnsSize = 10
  gameBoard.cellSize.height = 10
```

### `element: HTMLElement`

This getter returns a `NodeListOf<Element>` containing all cell elements.

#### Example

```javascript
this.#gameboardElement.appendChild(this.#gameboard.element);
```

### `cellElements: NodeListOf<Element>`

This getter returns a `NodeListOf<Element>` containing all cell elements.

## Public Methods

### getCellElementRowColumn(row:number, column:number):HTMLElement

This getter returns the cell-html-element corresponding to a row and column.

### `updateCellWidthHeight(width: number, height: number): void`

This method allows you to update the size of the board cells.

#### Example

```javascript
gameBoard.updateCellWidthHeight(20, 30);
```

### `addclickEventToCells(positions: PositionRowColumn[], onclick: (event: MouseEvent) => void): void`

This method allows you to add a click event to each cell in `cellElements`. You can pass a tailored event method as the second argument.

#### Example:

```javascript
this.#gameboard.addclickEventToCells(this.#gameboard.getAllPositionsOnBoardAsArray(), this.boundHandleClick);
```

**Note**: Bind the method to `this` in the constructor of the calling class:  
`this.boundHandleClick = this.handleClick.bind(this);`

Can be used in conjunction with:

```javascript
cells.forEach(cell => {
  cell.removeEventListener('click', this.boundHandleClick);
});
```

### `getCellElementRowCol(row: number, col: number): HTMLElement`

This method retrieves the specified HTML cell element.

#### Example:

```javascript
gameBoard.getCellElementRowCol(3, 4);
```

### `getCellElementValueRowCol(row: number, col: number): string`

This method retrieves the HTML `textContent` of the specified cell.

#### Example:

```javascript
gameBoard.getCellElementValueRowCol(3, 4);
```

### `getLongestCellLineOfValueMatchIntersectingCell(currentCell: HTMLElement): HTMLElement[]`

This method returns an array of HTML-cell-elements representing the longest line of cells intersecting the specified cell with values that match that cell. Typical use would be to test for a winner in a tic-tac-toe game. It searches horisontally, vertically and diagonally.

#### Example:

```javascript
const aligned = gameBoard.getLongestCellLineOfValueMatchIntersectingCell(currentCell);
```

### `getAllPositionsOnBoardAsArray():PositionRowColumn[]`

This method returns an array of PositionRowColumn-objects representing all the position of all the cells on the game board.

#### Example:

```javascript
const positionsOnBoard = gameBoard.getAllPositionsOnBoardAsArray();
```

## Limits

Limits can be adjusted by editing the enum Limits in Limits.ts

## Default values

Gameboard size: rows = 5, columns = 5  
Cell size: width: 20px, height: 20px  
Position default: rows = 1, column = 1  

## Todo:s

As of now the library is completely devoted for use with HTML. The library should fully cut the bonds to the view and focus on game-service. The create HTML-board method can still be a feature, but the library must not rely on HTML but rather keep data separate.
