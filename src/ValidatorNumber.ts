export class ValidatorNumber{

  private number:number

  constructor(number:number){
    this.number = number
  }

  checkFinite(){
    if(!Number.isFinite(this.number)){
      throw new Error('number must be finite')
    }
    return this
  }

  checkInteger(){

    if (!Number.isInteger(this.number)) {
      throw new Error('number must be an integer')
    }
    return this
  }

  checkPositive(){
    if(this.number <= 0){
      throw new Error('number must be positive')
    }
    return this
  }

  checkGreaterThanZero(){
      if (this.number <= 0) {
        throw new Error('number must be greater than zero')
      }
    return this
  }
}
