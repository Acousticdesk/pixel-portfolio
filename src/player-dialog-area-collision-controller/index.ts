import { Player } from "../player";
import { Boundary } from "../boundary";
import { DialogAreaController } from "../dialog-area-controller";
import { Collision } from "../collision";
import { Map } from "../map";

export class PlayerDialogAreaCollisionController {
  // the app needs this gap to show the dialog window
  // when a user is close to the area of interaction with NPC
  static createGapAreaAroundPlayer() {
    const gapSize = 32;
    const originalPlayerPositionX = Player.x - Map.initialImageOffsetX;
    const originalPlayerPositionY = Player.y - Map.initialImageOffsetY;
    const playerImage = Player.sprite.getImage();

    return {
      x:
        originalPlayerPositionX -
        (Player.SINGLE_PRESET_WIDTH + gapSize) / 2 +
        Player.SINGLE_PRESET_WIDTH / 2,
      y:
        originalPlayerPositionY -
        (playerImage.height + gapSize) / 2 +
        playerImage.height / 2,
      width: Player.SINGLE_PRESET_WIDTH + gapSize,
      height: playerImage.height + gapSize,
    };
  }
  static findCollisionTile() {
    for (let dialogArea of DialogAreaController.getDialogAreas()) {
      const playerWithGapArea =
        PlayerDialogAreaCollisionController.createGapAreaAroundPlayer();
      if (
        Collision.rectangularCollision(playerWithGapArea, {
          x: dialogArea.x,
          width: Boundary.size,
          y: dialogArea.y,
          height: Boundary.size,
        })
      ) {
        return dialogArea;
      }
    }

    return null;
  }
}
