import { Player } from "../player";
import { BoundaryController } from "../boundary-controller";
import { Boundary } from "../boundary";
import { MAP_ENUMS } from "../map/enums";
import { Collision } from "../collision";

export class PlayerBoundaryCollisionController {
  // playerDirection is required to predict the next user position during the movement
  // we need to predict the next position to prevent being stuck in a collision
  // without possibility to move
  static isCollisionDetected(playerDirection: number[] = [0, 0]) {
    for (let boundary of BoundaryController.getBoundaries()) {
      if (
        Collision.rectangularCollision(
          {
            x: Player.x + playerDirection[0] - MAP_ENUMS.INITIAL_MAP_POSITION_X,
            y: Player.y + playerDirection[1] - MAP_ENUMS.INITIAL_MAP_POSITION_Y,
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
