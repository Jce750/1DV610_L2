# GameBoard Library
This is a game-builder and management library created with Typescript in Visual Studio Code.
See an extensive example of use in the demo-app
at:

  [https://github.com/Jce750/1DV610_L2_Demo](https://github.com/Jce750/1DV610_L2_Demo).

The main implementation can be found in:  
/src/js/components/x-tictactoe/tictactoe.js

In general it is good to know that the libraries intended use is to create and handle a rectangular 2D game board object. It consists of rectangular cells. The cells can have a click function and a text content. It is meant to be like a controller for a HTML game board-element and game. It is an easy way to bring extra functionality to your component without cluttering them with code.
It has a game analysis tool that can evaluate game-state.

## Installation
In your library-folder, open a command prompt.
To download a copy of the library run:

```git
git clone https://github.com/Jce750/1DV610_L2
```

then to install dependencies run:
```node
npm install
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
npm test
```

Tests are available in /src/__tests__

### Public functionality:
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

(read/write)  
This property returns an object of type `CellSizeWidthHeight` containing two attributes: `width` and `height`.

  example:

  ```javascript
  const currentCellWidth = gameBoard.cellSize.width
  const currentCellHeight = gameBoard.cellSize.height
  gameBoard.size.columnsSize = 10
  gameBoard.cellSize.height = 10
```

### `element: HTMLElement`

(read-only)  
This method returns a `NodeListOf<Element>` containing all cell elements.

#### Example:
```javascript
this.#gameboardElement.appendChild(this.#gameboard.element);
```

### `cellElements: NodeListOf<Element>`
(read-only)  
This method returns a `NodeListOf<Element>` containing all cell elements.



### `updateCellWidthHeight(width: number, height: number): void`

This method allows you to update the size of the board cells.

#### Example:
```javascript
gameBoard.updateCellWidthHeight(20, 30);
```

### `addclickEventToCells(cellElements: HTMLCollection, onclick: (event: MouseEvent) => void): void`

This method allows you to add a click event to each cell in `cellElements`. You can pass a tailored event method as the second argument.

#### Example:
```javascript
this.#gameboard.addclickEventToCells(this.#gameboard.cellElements, this.boundHandleClick);
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

## Limits

Limits can be adjusted by editing the enum Limits in Limits.ts

## Default values

Gameboard size: rows = 5, columns = 5  
Cell size: width: 20px, height: 20px  
Position default: rows = 1, column = 1  
