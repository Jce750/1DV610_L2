export class validator{

  private number:number

  constructor(number:number){
    this.number = number
  }

  isFinite(){
    if(!Number.isFinite(this.number)){
      throw new Error('number must be finite')
    }
    return this
  }

  isInteger(){
    if(!Number.isInteger(this.number)){
      throw new Error('number must be an integer')
    }
    return this
  }

  isPositive(){
    if(this.number < 0){
      throw new Error('number must be positive')
    }
    return this
  }
}
