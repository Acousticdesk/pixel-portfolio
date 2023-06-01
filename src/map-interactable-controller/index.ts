import { InteractableController } from "../interactable-controller";
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
import { project2Template } from "../projects/templates/project-2";

export class MapInteractableController {
  static interactablesOnMap: Record<string, InteractableController> = {};
  static currentMap = "map-1";

  static async init() {
    const map1InteractableController = new InteractableController();
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
    const map1Npc1Interactable = new InteractableDecorator(
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

    map1InteractableController.addInteractable(map1Npc1Interactable);

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

    map1InteractableController.addInteractable(map1Computer1Interactable);

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
          project2Template
        );
      }
    );

    await map1Computer2Interactable.init("");

    map1InteractableController.addInteractable(map1Computer2Interactable);

    MapInteractableController.interactablesOnMap["map-1"] =
      map1InteractableController;
  }

  static selectNPCsOnCurrentMap() {
    if (
      !MapInteractableController.interactablesOnMap[
        MapInteractableController.currentMap
      ]
    ) {
      throw new Error(
        "MapInteractableController was never inited. Please call MapInteractableController.init()"
      );
    }
    return MapInteractableController.interactablesOnMap[
      MapInteractableController.currentMap
    ];
  }
}
