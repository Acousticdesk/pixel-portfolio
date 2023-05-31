import { NPCController } from "../npc-controller";
import { NPC } from "../npc";
import { NPC_IMAGES } from "../npc/consts";
import { CompanionDecorator } from "../npc/decorators";
import { Map } from "../map";
import { MAP_NPC_CONTROLLER_ENUMS } from "./enums";
import { Phrases } from "../phrases";
import dialogTexts from "../dialog-texts";
import { InteractableDecorator } from "../interactable/decorators";
import { ObjectOnMap } from "../object-on-map";
import { DialogsController } from "../dialogs-controller";
import { project1Template } from "../projects/templates/project-1";

// todo akicha: rename to MapInteractableController
export class MapNPCController {
  static npcsOnMap: Record<string, NPCController> = {};
  static currentMap = "map-1";

  static async init() {
    const map1NPCController = new NPCController();
    const map1Npc1 = new NPC({
      x:
        Map.initialImageOffsetX +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_RECEPTIONIST_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_RECEPTIONIST_OFFSET_Y,
    });
    const map1Npc1Companion = new CompanionDecorator(
      map1Npc1,
      new Phrases(dialogTexts["map-1"]["npc-1"])
    );
    // todo akicha 1:
    const map1Npc1Interactable = new InteractableDecorator(
      // @ts-ignore
      map1Npc1Companion,
      1816,
      (self) => {
        const npcPhrase = (self.getSubject() as CompanionDecorator)
          .getPhrases()
          .getPhrase(0);
        DialogsController.getDialog("text-dialog").handleDialogShow(npcPhrase);
      }
    );
    await map1Npc1Interactable.init(NPC_IMAGES.MAP_1_RECEPTIONIST_NPC_IMAGE);

    map1NPCController.addNPC(map1Npc1Interactable);

    // todo akicha 1: fix the issue with the tile position when the window is resized
    const map1Computer1 = new ObjectOnMap({
      x:
        Map.initialImageOffsetX +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_COMPUTER_1_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_COMPUTER_1_OFFSET_Y,
    });

    // todo akicha 1: add interaction tile ids to enums
    const map1Computer1Interactable = new InteractableDecorator(
      // @ts-ignore
      map1Computer1,
      1817,
      () => {
        DialogsController.getDialog("markup-dialog").handleDialogShow(
          project1Template
        );
      }
    );

    await map1Computer1Interactable.init("");

    map1NPCController.addNPC(map1Computer1Interactable);

    // todo akicha 1: fix the issue with the tile position when the window is resized
    const map1Computer2 = new ObjectOnMap({
      x:
        Map.initialImageOffsetX +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_COMPUTER_2_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_COMPUTER_2_OFFSET_Y,
    });

    // todo akicha 1: add interaction tile ids to enums
    const map1Computer2Interactable = new InteractableDecorator(
      // @ts-ignore
      map1Computer2,
      1818,
      () => {
        DialogsController.getDialog("markup-dialog").handleDialogShow(
          project1Template
        );
      }
    );

    await map1Computer2Interactable.init("");

    map1NPCController.addNPC(map1Computer2Interactable);

    MapNPCController.npcsOnMap["map-1"] = map1NPCController;
  }

  static selectNPCsOnCurrentMap() {
    if (!MapNPCController.npcsOnMap[MapNPCController.currentMap]) {
      throw new Error(
        "MapNPCController was never inited. Please call MapNPCController.init()"
      );
    }
    return MapNPCController.npcsOnMap[MapNPCController.currentMap];
  }
}
