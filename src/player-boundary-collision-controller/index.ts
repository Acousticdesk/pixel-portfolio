import { Player } from "../player";
import { BoundaryController } from "../boundary-controller";
import { Boundary } from "../boundary";

export class PlayerBoundaryCollisionController {
  static rectangularCollision(
    box1: { x: number; y: number; width: number; height: number },
    box2: { x: number; y: number; width: number; height: number }
  ) {
    return (
      box1.x + box1.width >= box2.x &&
      box1.x <= box1.x + box1.width &&
      box1.y + box1.height <= box2.y &&
      box1.y >= box1.y + box1.height
    );
  }
  static isCollisionDetected() {
    for (let boundary of BoundaryController.getBoundaries()) {
      if (
        PlayerBoundaryCollisionController.rectangularCollision(
          {
            x: Player.x,
            width: Player.playerImage.width,
            y: Player.y,
            height: Player.playerImage.height,
          },
          {
            x: boundary.x,
            width: Boundary.size,
            y: boundary.y,
            height: Boundary.size,
          }
        )
      ) {
        return true;
      }
    }

    return false;
  }
}
