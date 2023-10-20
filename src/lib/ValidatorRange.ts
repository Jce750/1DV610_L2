
export class ValidatorRange{

  public checkMinLessThanMax(min: number, max: number):void{
    if(min >= max){
      throw new Error('min must be less than or equal to max');
    }
  }
}