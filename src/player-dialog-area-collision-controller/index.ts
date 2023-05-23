import { Player } from "../player";
import { Boundary } from "../boundary";
import { MAP_ENUMS } from "../map/enums";
import { DialogAreaController } from "../dialog-area-controller";
import { PLAYER_ENUMS } from "../player/enums";
import { Collision } from "../collision";

export class PlayerDialogAreaCollisionController {
  static findCollisionTile() {
    // todo akicha: fix issue with player with offset detection at the bottom of the table
    // when a or d key is pressed
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
        Collision.rectangularCollision(
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
