export class GameBoardHtmlFactory {
  createGameBoardHTML(matrixSizeRowsCols matrixSize):HTMLElement {
    const gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('gameboard')
    for (let row = 1; row <= matrixSize.rowsSize; row++) {
      gameBoardElement.appendChild(this.#createRowOfCells(row))
    }
    return gameBoardElement
  }
}