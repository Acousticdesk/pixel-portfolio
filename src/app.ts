import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";
import { MovementController } from "./movement-controller";
import { Keyboard } from "./keyboard";
import { collisions } from "./collisions";
import { dialogAreas } from "./dialog-areas";
import { InteractionTileMapper } from "./interaction-tile-mapper";
import { BoundaryController } from "./boundary-controller";
import { MapForeground } from "./map-foreground";
import { MapNPCController } from "./map-npc-controller";
import { DialogAreaController } from "./dialog-area-controller";
import { NpcDialogController } from "./npc-dialog-controller";

function animate() {
  Canvas.resetCanvas();
  MovementController.move();
  Map.draw();
  BoundaryController.draw();
  DialogAreaController.draw();
  NpcDialogController.trySpeakToAnyone();
  Player.move();
  Player.draw();
  MapNPCController.selectNPCsOnCurrentMap().updateIdlingPosition().draw();
  Player.draw();
  MapForeground.draw();
  window.requestAnimationFrame(animate);
}

export async function main() {
  BoundaryController.init(
    InteractionTileMapper.createInteractionTileCoordinates<{
      x: number;
      y: number;
    }>(collisions, {
      createInteractionTile: ({ x, y }) => ({ x, y }),
    })
  );

  DialogAreaController.init(
    InteractionTileMapper.createInteractionTileCoordinates<{
      x: number;
      y: number;
      value: number;
    }>(dialogAreas, {
      createInteractionTile: ({ x, y, i, j }) => ({
        x,
        y,
        value: dialogAreas[i][j],
      }),
    })
  );

  Canvas.init();
  await Map.init();
  await Player.init();
  await MapNPCController.init();
  await MapForeground.init();
  Keyboard.init();
  animate();
}
