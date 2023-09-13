export class CellSizeWidthHeight {
  #width:number = 0
  #height:number = 0
  
  constructor(public pixelWidth:number,public pixelHeight:number) {
    this.width = pixelWidth
    this.height = pixelHeight
  }

  get width():number{
    return this.#width
  }
  get height():number{
    return this.#height
  }
  set width(width:number){
    this.#width = width
  }
  set height(height:number){
    this.#height = height
  }
}