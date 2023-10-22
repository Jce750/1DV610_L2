import { MagicData } from "./MagicData";
import { ValidatorNumber } from "./ValidatorNumber";
import { ValidatorRange } from "./ValidatorRange";

/**
 * A class to represent a range of positive integers.
 *
 */
export class RangeMinMax{
  #min: number;
  #max: number;

  constructor(min: number, max: number){
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
    new ValidatorNumber(min).checkFinite()
    new ValidatorNumber(max).checkFinite()
    new ValidatorRange().checkMinLessThanMax(min, max)
  }

  checkValueInRange(value: number):boolean{
    if(value < this.min || value > this.max){
      throw new Error(`value must be between ${this.min} and ${this.max}`);
    }
    return true;
  }
}