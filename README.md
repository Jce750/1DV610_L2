# GameBoard Library

This is a game-builder and management library created with Typescript in Visual Studio Code.

The intended use for the library is to create and handle a rectangular 2D matrix object. It consists of rectangular cells.

It has a section specialized in HTML-game-boards. When using the library to create the HTML-objects it will index them in order to be able to provide tools for analysis and manipulation. The cells can have a click function and a text content. It is meant to be like a controller for a HTML game board-element and game. It has a game analysis tool that can evaluate game-state. It is an easy way to bring extra functionality to your games without cluttering them with code.

## Demo

See an example of use in the demo-app. It is a simple TicTacToe game, built as web-component, written in javascript. A Readme is available at the root of the project explaining how to install and use.

Demo available at:

  [https://github.com/Jce750/1DV610_L2_Demo](https://github.com/Jce750/1DV610_L2_Demo/tree/L3).

  The main implementation in the demo can be found in:
  /src/js/components/x-tictactoe/tictactoe.js

## Installation (library)

Please note there are several ways to do this. This will show one basic way!

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

to compile run:

```node
tsc
```

The exported files listed in package.json should now be available in the dist-folder. They are the files exposing the public library methods.

## Use library

### Create wrapper class

It is recommended to use a wrapper class in your app to limit exposure to the vast flora of functionalities available in the library.

The library has 2 facade classes exposing the public methods.
IMatrix2DFacade.ts - General matrix handler
IHtmlGameBoardFacade.ts - Specialized in HTML-gameBoard handler

Example of wrapper exposing a method:

```javascript

import { IMatrix2DFacade } from 'matrixanalysislibrary/IMatrix2DFacade'

export class WrapperGameBoardLibrary {
  constructor () {
    this.IMatrix2DFacade = new IMatrix2DFacade()
  }

  /**
   * This will create a new game-board by using the matrixanalysislibrary.
   * Argument is a anonymous object with the properties rows and columns.
   *
   * @param {rows} rows rows
   * @returns {object} A new game-board
   */
  createMatrixByRowsColumns ({ rows, columns }) {
    return this.IMatrix2DFacade.buildMatrix2DFromScratch({ rows, columns })
  }
```

### Add wrapper to game - To gain access to its methods

Example of game-component instantiating the wrapper to make selected library functionality available:

```javascript
  class extends HTMLElement {
    ...
    #gameBoardLibrary
    ...
    constructor () {
      ...
      this.#gameBoardLibrary = new WrapperGameBoardLibrary()
      ...
    }
```

### Use wrapper methods

Example of creating a gameboard element using a method of the library available through the wrapper:

```javascript
    #createGameBoard () {
        ...
        this.#gameBoardElement = this.#gameBoardLibrary.createGameBoardHtmlElementByRowsColumns(this.#sideSize, this.#sideSize)
        ...
    }
```

## Public Facades and their methods

### IMatrix2DFacade

__buildMatrix2DFromScratch__  
Build a rectangular matrix of cells given rows and columns. Rows go along the y-axis, and columns go along the x-axis (1-indexed).

```javascript
buildMatrix2DFromScratch(size: MatrixSizeRowsCols): Matrix2D

  // Example of use
  const tabort = this.#gameBoardLibrary.createMatrixByRowsColumns({ rows: this.#sideSize, columns: this.#sideSize })
    console.log('FFFFFFF', tabort)

  // Example of matrix object
  {
    "Matrix2D": {
      "size": {
        "columns": 15,
        "rows": 15
      },
      "cells": [
        "0 ... 99",
        "100 ... 199",
        "200 ... 224"
      ],
      "length": 225
    }
  }

  // Structure of cell object:
  {
    "Cell": {
      "point": "...",
      "size": "...",
      "value": "..."
    }
  }

```

__getLongestCellElementLineOfValueMatchIntersectingCell__  
Get all aligned points intersecting the specified point and having the same value.
Can typically be used to get the winning line in a game of tic-tac-toe.

```javascript
getLongestCellElementLineOfValueMatchIntersectingCell(currentCell: Point2D, matrix: Matrix2D): Point2D[]
```

__buildMatrixFromGameBoardHtmlElement__  
Creates a matrix from a compatible HTML element. The element would typically be a game board element created by the library.

```javascript
buildMatrixFromGameBoardHtmlElement(elementToExamine: HTMLElement): Matrix2D
```

### IHtmlGameBoardFacade

__getCellHtmlElementAtPoint__  
Returns a single HTMLelement representation of a cell at a point (coordinate).
1-based indexing is used for points.

```javascript
getCellHtmlElementAtPoint(point:Point2D, gameBoardElement:HTMLElement): HTMLElement
```

__getCellHtmlElementValueAtPoint__
Returns the inner text value of a cell at a point (coordinate). 1-based indexing is used for points.

```javascript
getCellHtmlElementValueAtPoint(point: { x: number, y: number }, gameBoardElement: HTMLElement): String
```

__addClickEventToCell__
Adds a click event to a single cell.

```javascript
addClickEventToCell(cellElement: HTMLElement, onclick: ((event: MouseEvent) => void)): void
```

__addClickEventToHtmlElementCells__
Adds a click event to all cells in the selection of the HTML game board.

```javascript
addClickEventToHtmlElementCells(selection: PointsSelectionComposite, onclick: ((event: MouseEvent) => void), gameBoardHtmlElement: HTMLElement): void
```

__addClickEventToAllCellsInHtmlElement__
Adds a click event to each cell in the HTML game board.

```javascript
addClickEventToAllCellsInHtmlElement(onclick: ((event: MouseEvent) => void), gameBoardHtmlElement: HTMLElement): void

// example:
this.#gameboard.addClickEventToAllCellsInHtmlElement(this.boundHandleClick);
```

**Note**: Bind the method to `this` in the constructor of the calling class:  
`this.boundHandleClick = this.handleClick.bind(this);`

Can be used in conjunction with:

```javascript
cells.forEach(cell => {
  cell.removeEventListener('click', this.boundHandleClick);
});
```

__updateHtmlMatrixByMatrix__
Updates the HTML matrix with the values from the matrix.

```javascript
updateHtmlMatrixByMatrix(matrix: Matrix2D, htmlMatrix: HTMLElement): void
```

__updateMatrixByHtmlMatrix__
Updates the matrix with the values from the HTML matrix.

```javascript
updateMatrixByHtmlMatrix(matrix: Matrix2D, htmlMatrix: HTMLElement): void
```

__getLongestCellHtmlElementLineOfValueMatchIntersectingPoint__
Returns the HTML elements of the longest line of matching values intersecting the current cell.

```javascript
getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(currentCell: Point2D, matrix: Matrix2D, htmlMatrix: HTMLElement): HTMLElement[]
```

__createGameBoardHtml__
Creates a game board HTML element with rows and columns.

```javascript
createGameBoardHtml(matrixSize: { rows: number, columns: number }, cellSize: { width: number, height: number }): HTMLElement
```

__selectAllCellsPointsInHtmlElement__  
Creates a selection of points containing all the points in the HTML game board.

```javascript
selectAllCellsPointsInHtmlElement(gameBoardHtmlElement: HTMLElement): PointsSelectionComposite
```

__getCellHtmlElementPointInHtmlMatrix__  
Gets the HTML element at a point in the HTML matrix.

```javascript
getCellHtmlElementPointInHtmlMatrix(cellElement: HTMLElement, htmlMatrix: HTMLElement): Point2D
```

__getLongestCellElementLineOfValueMatchIntersectingCell__  
Returns the HTML elements of the longest line of matching values intersecting the current cell.

```javascript
getLongestCellElementLineOfValueMatchIntersectingCell(currentCellHtmlElement: HTMLElement, gameBoardHtmlElement: HTMLElement): HTMLElement[]
```

__getGameBoardSize__  
Gets the size of the game board.

```javascript
getGameBoardSize(gameBoardHtmlElement: HTMLElement): { rows: number, columns: number }
```

## Tests

To run the included tests In Visual Studio Code open terminal and run:

```node
npm run test
```

Tests are available in /src/__tests__

## Constants

Constants can be adjusted by editing the enum MagicData in MagicData.ts

  MinRows = 1,
  MinColumns = 1,
  MaxRows = 20,
  MaxColumns = 20,
  DefaultCellSize = 50,
  DefaultRowsColumnsCount = 5,
  FullCircle = 360,
  SemiCircle = 180,
  EightDirections = 360/8,
  Step45 = 45,
  HtmlDotCellSelector = '.cell',
  StringCell = 'cell',
  StringDiv = 'div',
  StringGameBoard = 'gameboard',
  HtmlCellColumn = 'data-col',
  HtmlCellRow = 'data-row',

## Developer

New functionalities can be added and exposed either by using the existing facade classes or by adding a new one. To make compiled versions of your files appear in the /dist folder add them under exports. This will make them available for import by your external app (presupposing your app has the library installed or linked see above)

```javascript
  "exports": {
    "./IMatrix2DFacade": "./dist/IMatrix2DFacade.js",
    "./IHtmlGameBoardFacade": "./dist/IHtmlGameBoardFacade.js"
  }
  ```

## Ideas for future extensions

- Ability to work with json.
- Ability to change cell-size on gameboard cells
