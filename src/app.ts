import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";
import { MovementController } from "./movement-controller";
import { Keyboard } from "./keyboard";
import { collisions } from "./collisions";
import { forumAreas } from "./forum-areas";
import { BoundaryMapper } from "./boundary-mapper";
import { BoundaryController } from "./boundary-controller";
import { MapForeground } from "./map-foreground";
import { MapNPCController } from "./map-npc-controller";
import { ForumAreaController } from "./forum-area-controller";
import { NpcDialogController } from "./npc-dialog-controller";

function animate() {
  Canvas.resetCanvas();
  MovementController.move();
  Map.draw();
  BoundaryController.draw();
  ForumAreaController.draw();
  NpcDialogController.trySpeakToAnyone();
  Player.move();
  Player.draw();
  MapNPCController.selectNPCsOnCurrentMap().updateIdlingPosition().draw();
  Player.draw();
  MapForeground.draw();
  window.requestAnimationFrame(animate);
}

export async function main() {
  BoundaryController.init(BoundaryMapper.createBoundaryCoordinates(collisions));
  ForumAreaController.init(
    BoundaryMapper.createBoundaryCoordinates(forumAreas)
  );

  Canvas.init();
  await Map.init();
  await Player.init();
  await MapNPCController.init();
  await MapForeground.init();
  Keyboard.init();
  animate();
}
