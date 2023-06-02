import { Player } from "../player";
import { BoundaryController } from "../boundary-controller";
import { Boundary } from "../boundary";
import { Collision } from "../collision";
import { Map } from "../map";

export class PlayerBoundaryCollisionController {
  // playerDirection is required to predict the next user position during the movement
  // we need to predict the next position to prevent being stuck in a collision
  // without possibility to move
  static isCollisionDetected(playerDirection: number[] = [0, 0]) {
    for (let boundary of BoundaryController.getBoundaries()) {
      if (
        Collision.rectangularCollision(
          {
            x: Player.x + playerDirection[0] - Map.initialImageOffsetX,
            y: Player.y + playerDirection[1] - Map.initialImageOffsetY,
            width: Player.SINGLE_PRESET_WIDTH,
            height: Player.sprite.getImage().height,
          },
          {
            x: boundary.getX(),
            width: Boundary.size,
            y: boundary.getY(),
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
