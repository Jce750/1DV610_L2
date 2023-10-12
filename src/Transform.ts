import { Limits } from "./Limits";
import { Point2D } from "./Point2D";
import { RangeMinMax } from "./RangeMinMax";
import { Rotation } from "./Rotation";
import { Scale2D } from "./Scale2D";
import { ValidatorNumber } from "./ValidatorNumber";
import { ValidatorRange } from "./ValidatorRange";

export class Transform2D {
  #vector:Point2D = new Point2D(0, 0)
  #rotation:Rotation = new Rotation(0)
  #scale:Scale2D = new Scale2D(1, 1)

  constructor(point1: Point2D, point2?: Point2D) {
    if (!point2) {
      point2 = new Point2D(0, 0)
    }
    this.#vector = new Point2D(point2.x - point1.x, point2.y - point1.y);
    const angleInRadians = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    this.#rotation = new Rotation(angleInDegrees);
    this.#scale = new Scale2D(1, 1)
  }

  get x() {
    return this.#vector.x
  }

  get y() {
    return this.#vector.y
  }

  // Staticisch
  public getVectorsStepDegrees(step:number):Transform2D[]{
    const vectors:Transform2D[] = []
    for (let degree = 0; degree < Limits.FullCircle; degree += step) {
      [...vectors, this.createNormalizedDirectionVector(degree)]
    }
    return vectors
  }

  createNormalizedDirectionVector(degrees:number):Point2D {
    const x = Math.cos(degrees*Math.PI/180);
    const y = Math.sin(degrees*Math.PI/180);
    return new Point2D(x,y).normalize()
  }

  public getInvertedCopy():Transform2D {
    return new Transform2D(new Point2D(0,0), new Point2D(this.#vector.x * -1, this.#vector.y * -1))
  }


  normalize(): Transform2D {
    const length = Math.sqrt(this.#vector.x ** 2 + this.#vector.y ** 2);
    return new Transform2D(new Point2D(this.#vector.x / length, this.#vector.y / length), new Point2D(0, 0));
  }
}