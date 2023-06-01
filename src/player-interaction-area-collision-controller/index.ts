import { Player } from "../player";
import { Boundary } from "../boundary";
import { InteractionAreaController } from "../interaction-area-controller";
import { Collision } from "../collision";
import { Map } from "../map";

export class PlayerInteractionAreaCollisionController {
  // the app needs this gap to show the dialog window
  // when a user is close to the area of interaction with Interactable
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
    for (let interactionArea of InteractionAreaController.getInteractionAreas()) {
      const playerWithGapArea =
        PlayerInteractionAreaCollisionController.createGapAreaAroundPlayer();
      if (
        Collision.rectangularCollision(playerWithGapArea, {
          x: interactionArea.x,
          width: Boundary.size,
          y: interactionArea.y,
          height: Boundary.size,
        })
      ) {
        return interactionArea;
      }
    }

    return null;
  }
}
