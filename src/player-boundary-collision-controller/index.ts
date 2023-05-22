import { Player } from "../player";
import { BoundaryController } from "../boundary-controller";
import { Boundary } from "../boundary";
import { MAP_ENUMS } from "../map/enums";

// todo akicha: rectangular collision is common for each types of collision in game
export class PlayerBoundaryCollisionController {
  static rectangularCollision(
    box1: { x: number; y: number; width: number; height: number },
    box2: { x: number; y: number; width: number; height: number }
  ) {
    return (
      box1.x + box1.width >= box2.x &&
      box1.x <= box2.x + box2.width &&
      box1.y <= box2.y + box2.height &&
      box1.y + box1.height >= box2.y
    );
  }
  // playerDirection is required to predict the next user position during the movement
  // we need to predict the next position to prevent being stuck in a collision
  // without possibility to move
  static isCollisionDetected(playerDirection: number[] = [0, 0]) {
    for (let boundary of BoundaryController.getBoundaries()) {
      if (
        PlayerBoundaryCollisionController.rectangularCollision(
          {
            x: Player.x + playerDirection[0] - MAP_ENUMS.INITIAL_MAP_POSITION_X,
            y: Player.y + playerDirection[1] - MAP_ENUMS.INITIAL_MAP_POSITION_Y,
            width: Player.SINGLE_PRESET_WIDTH,
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
