
/**
 * A class to represent a range of positive integers.
 *
 */
export class RangeMinMax{
  #min: number;
  #max: number;

  constructor(min: number = 1, max: number = 10){
    this.#validateInput(min, max);
    this.#min = min;
    this.#max = max;
  }

  get min(){
    return this.#min;
  }

  get max(){
    return this.#max;
  }

  #validateInput(min: number, max: number):void{
    if(!Number.isFinite(min) || !Number.isFinite(max)){
      throw new Error('min and max must be finite numbers');
    }
    if(min <= 0 || max <= 0){
      throw new Error('min and max must be greater than 0');
    }
    if(min >= max){
      throw new Error('min must be less than or equal to max');
    }
    if(!Number.isInteger(min) || !Number.isInteger(max)){
      throw new Error('min and max must be integers');
    }
  }

  checkValueInRange(value: number):boolean{
    if(value < this.min || value > this.max){
      console.log(`inRange: ${value} returns false`)
      throw new Error(`value must be between ${this.min} and ${this.max}`);
    }
    return true;
  }
}
