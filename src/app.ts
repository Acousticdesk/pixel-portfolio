import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";
import { MovementController } from "./movement-controller";
import { Keyboard } from "./keyboard";
import { collisions } from "./collisions";
import { interactionAreas } from "./interaction-areas";
import { InteractionTileMapper } from "./interaction-tile-mapper";
import { BoundaryController } from "./boundary-controller";
import { MapForeground } from "./map-foreground";
import { MapNPCController } from "./map-npc-controller";
import { InteractionAreaController } from "./interaction-area-controller";
import { PlayerInteractionAreaController } from "./player-interaction-area-controller";
import { MovablesController } from "./movables-controller";
import { Dialog } from "./dialog";
import { Onboarding } from "./onboarding";
import { DialogsController } from "./dialogs-controller";
import { TextDialogImplementation } from "./dialog/implementations/text-dialog";
import { MarkupDialogImplementation } from "./dialog/implementations/markup-dialog";

// todo akicha: add dialogs for communication w/ NPC, use Press Start 2P font, animate text rendering,
//  add dialog windows, add dialog controls

// todo akicha: add onboarding
// todo akicha: add npc with feedbacks about work
// todo akicha: add interaction with bookshelf about the books read

// todo akicha: create a interactable class that may include npcs and objects
function animate() {
  Canvas.resetCanvas();
  MovementController.move();
  Map.draw();
  BoundaryController.draw();
  InteractionAreaController.draw();
  // todo akicha: find a more meaningful naming
  PlayerInteractionAreaController.trySpeakToAnyone();
  PlayerInteractionAreaController.talk();
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

  InteractionAreaController.init(
    InteractionTileMapper.createInteractionTileCoordinates<{
      x: number;
      y: number;
      value: number;
    }>(interactionAreas, {
      createInteractionTile: ({ x, y, i, j }) => ({
        x,
        y,
        value: interactionAreas[i][j],
      }),
    })
  );

  MovablesController.registerCollection({
    getItems: () => BoundaryController.getBoundaries(),
  });

  MovablesController.registerCollection({
    getItems: () => MapNPCController.selectNPCsOnCurrentMap().getNPCs(),
  });

  MovablesController.registerCollection({
    getItems: () => InteractionAreaController.getInteractionAreas(),
  });

  DialogsController.registerDialog(
    "text-dialog",
    new Dialog(new TextDialogImplementation())
  );

  DialogsController.registerDialog(
    "markup-dialog",
    new Dialog(new MarkupDialogImplementation())
  );

  Onboarding.init();

  Canvas.init();
  await Map.init();
  await Player.init();
  await MapNPCController.init();
  await MapForeground.init();
  Keyboard.init();
  animate();
}
