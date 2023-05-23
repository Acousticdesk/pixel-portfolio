import { Player } from "../player";
import { Boundary } from "../boundary";
import { MAP_ENUMS } from "../map/enums";
import { DialogAreaController } from "../dialog-area-controller";
import { PLAYER_ENUMS } from "../player/enums";

// todo akicha: rectangular collision is common for each types of collision in game
export class PlayerDialogAreaCollisionController {
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
  static findCollisionTile() {
    // todo akicha: to enum
    const offsetX =
      Player.movementDirection === PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT
        ? 5
        : -5;
    const offsetY =
      Player.movementDirection === PLAYER_ENUMS.MOVEMENT_DIRECTION_UP
        ? -10
        : 10;
    for (let dialogArea of DialogAreaController.getDialogAreas()) {
      if (
        PlayerDialogAreaCollisionController.rectangularCollision(
          {
            x: Player.x + offsetX - MAP_ENUMS.INITIAL_MAP_POSITION_X,
            y: Player.y + offsetY - MAP_ENUMS.INITIAL_MAP_POSITION_Y,
            width: Player.SINGLE_PRESET_WIDTH,
            height: Player.playerImage.height,
          },
          {
            x: dialogArea.x,
            width: Boundary.size,
            y: dialogArea.y,
            height: Boundary.size,
          }
        )
      ) {
        return dialogArea;
      }
    }

    return null;
  }
}
