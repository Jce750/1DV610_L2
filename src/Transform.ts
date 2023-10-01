import { Point2D } from "./Point2D";
import { RangeMinMax } from "./RangeMinMax";
import { Rotation } from "./Rotation";
import { Scale2D } from "./Scale2D";
import { ValidatorNumber } from "./ValidatorNumber";
import { ValidatorRange } from "./ValidatorRange";

export class Transform {
  
  #point:Point2D = new Point2D(0, 0)
  #rotation:Rotation = new Rotation(0)
  #scale:Scale2D = new Scale2D(1, 1)
  
  constructor(_point:Point2D, rotation:Rotation, scale:Scale2D) {
   this.point = _point
  }

  get point() {
    return this.point
  }

  set point(newPoint:Point2D) {
    this.#point = newPoint
  }

  get scale() {
    return this.#scale
  }

  set scale(newScale:Scale2D) {
    this.#scale = newScale
  }

  get rotation():Rotation {
    return this.#rotation
  }

  set rotation(newRotation:Rotation) {
    this.#rotation = newRotation
  }

  public getVectorsStepDegrees(range:RangeMinMax, step:number):Transform[]{
    new ValidatorNumber(range.min).checkInteger().checkPositive
    new ValidatorNumber(range.max).checkInteger().checkPositive
    const vectors:Transform[] = []
    for (let degree = 0; degree < 360; degree += step) {
      [...vectors, new Transform(new Point2D(0,0), new Rotation(degree), new Scale2D(1,1))]
    }
    return vectors
  }

  public invertVector():Transform {
    const newPoint:Point2D = new Point2D(-this.point.x, -this.point.y)
    const newRotation:Rotation = new Rotation(-this.rotation.degrees)
    const newScale:Scale2D = new Scale2D(1/this.scale.x, 1/this.scale.y)
    return new Transform(newPoint, newRotation, newScale)
  }

}