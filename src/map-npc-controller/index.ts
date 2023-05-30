import { NPCController } from "../npc-controller";
import { NPC } from "../npc";
import { NPC_IMAGES } from "../npc/consts";
import { CompanionDecorator } from "../npc/decorators";
import { Map } from "../map";
import { MAP_NPC_CONTROLLER_ENUMS } from "./enums";
import { Phrases } from "../phrases";
import dialogTexts from "../dialog-texts";
import { InteractableDecorator } from "../interactable/decorators";

export class MapNPCController {
  static npcsOnMap: Record<string, NPCController> = {};
  static currentMap = "map-1";

  static async init() {
    const map1NPCController = new NPCController();
    const map1ReceptionistNpc = new NPC({
      x:
        Map.initialImageOffsetX +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_RECEPTIONIST_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_NPC_CONTROLLER_ENUMS.MAP_1_RECEPTIONIST_OFFSET_Y,
    });
    // todo akicha 1:
    const map1Npc1Interactable = new InteractableDecorator(
      // @ts-ignore
      map1ReceptionistNpc,
      1816
    );
    const map1Npc1Companion = new CompanionDecorator(
      map1Npc1Interactable,
      new Phrases(dialogTexts["map-1"]["npc-1"])
    );
    await map1Npc1Companion.init(NPC_IMAGES.MAP_1_RECEPTIONIST_NPC_IMAGE);

    map1NPCController.addNPC(map1Npc1Companion);

    MapNPCController.npcsOnMap["map-1"] = map1NPCController;
  }

  static selectMap(mapName: "map-1") {
    MapNPCController.currentMap = mapName;
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
