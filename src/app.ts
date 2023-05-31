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
import { NPCDialogController } from "./npc-dialog-controller";
import { MovablesController } from "./movables-controller";
import { NpcDialogUiController } from "./npc-dialog-ui-controller";
import { Onboarding } from "./onboarding";
import { DialogsController } from "./dialogs-controller";
import { TextDialogImplementation } from "./npc-dialog-ui-controller/implementations/text-dialog";
import { MarkupDialogImplementation } from "./npc-dialog-ui-controller/implementations/markup-dialog";

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
  DialogAreaController.draw();
  // todo akicha: find a more meaningful naming
  NPCDialogController.trySpeakToAnyone();
  NPCDialogController.talk();
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

  MovablesController.registerCollection({
    getItems: () => BoundaryController.getBoundaries(),
  });

  MovablesController.registerCollection({
    getItems: () => MapNPCController.selectNPCsOnCurrentMap().getNPCs(),
  });

  MovablesController.registerCollection({
    getItems: () => DialogAreaController.getDialogAreas(),
  });

  DialogsController.registerDialog(
    "text-dialog",
    new NpcDialogUiController(new TextDialogImplementation())
  );

  DialogsController.registerDialog(
    "markup-dialog",
    new NpcDialogUiController(new MarkupDialogImplementation())
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
