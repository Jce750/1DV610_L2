import { ValidatorNumber } from './ValidatorNumber'

export class Rotation {
  rotation:number = 0
  constructor(rotation:number) {
    this.rotation = rotation
  }

  get degrees() {
    return this.rotation
  }

  get radians() {
    return this.rotation * Math.PI / 180
  }

  set degrees(newRotation:number) {
    new ValidatorNumber(newRotation).checkFinite().checkPositive()
    if (newRotation > 360) {
      newRotation = newRotation % 360
    }
    this.rotation = newRotation
  }

  set radians(newRotation:number) {
    this.rotation = newRotation * 180 / Math.PI
  }
}