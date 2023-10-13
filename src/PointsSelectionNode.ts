import { Point2D } from './Point2D';
import { PointsSelectionComposite } from './PointsSelectionComposite';

export class Node implements PointsSelectionComposite {
  private points: PointsSelectionComposite[] = [];

  add(point: PointsSelectionComposite): void {
    this.points.push(point);
  }

  remove(point: PointsSelectionComposite): void {
    const index = this.points.indexOf(point);
    if (index !== -1) {
      this.points.splice(index, 1);
    }
  }
}