import { NPCController } from "../npc-controller";
import { NPC } from "../npc";
import { NPC_IMAGES } from "../npc/consts";

export class MapNPCController {
  static npcsOnMap: Record<string, NPCController> = {};
  static currentMap = "map-1";

  static async init() {
    const map1NPCController = new NPCController();
    const map1ReceptionistNPC = new NPC({ x: 820, y: 135 });

    await map1ReceptionistNPC.init(NPC_IMAGES.MAP_1_RECEPTIONIST_NPC_IMAGE);
    map1NPCController.addNPC(map1ReceptionistNPC);

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
