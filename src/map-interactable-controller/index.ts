import { InteractableController } from "../interactable-controller";
import { NPC } from "../npc";
import { NPC_IMAGES } from "../npc/consts";
import { CompanionDecorator } from "../npc/decorators";
import { Map } from "../map";
import { MAP_INTERACTABLE_CONTROLLER_ENUMS } from "./enums";
import { Phrases } from "../phrases";
import dialogTexts from "../dialog-texts";
import { InteractableDecorator } from "../interactable";
import { ObjectOnMap } from "../object-on-map";
import { DialogsController } from "../dialogs-controller";
import { project1Template } from "../projects/templates/project-1";
import { project2Template } from "../projects/templates/project-2";
import { bookshelfTemplate } from "../bookshelf/templates";

export class MapInteractableController {
  static interactablesOnMap: Record<string, InteractableController> = {};
  static currentMap = "map-1";

  static async init() {
    const map1Npc1 = new NPC({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_1_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_1_OFFSET_Y,
      animationThrottleMs: 50,
    });
    const map1Npc1Companion = new CompanionDecorator(
      map1Npc1,
      new Phrases(dialogTexts["map-1"]["npc-1"])
    );
    const map1Npc1Interactable = new InteractableDecorator(
      map1Npc1Companion,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_1_INTERACTION_TILE_ID,
      (self) => {
        const npcPhrase = (self.getSubject() as CompanionDecorator)
          .getPhrases()
          .getPhrase(0);
        DialogsController.getDialog("text-dialog").handleDialogShow(npcPhrase);
      }
    );

    await (await map1Npc1Interactable.init()).getSubject().init({
      src: NPC_IMAGES.MAP_1_NPC_1_IMAGE,
      numberOfFrames: 24,
      framesOfInterest: [18, 23],
    });

    const map1InteractableController = new InteractableController();
    map1InteractableController.addInteractable(map1Npc1Interactable);

    const map1Npc2 = new NPC({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_2_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_2_OFFSET_Y,
      animationThrottleMs: 100,
    });
    const map1Npc2Companion = new CompanionDecorator(
      map1Npc2,
      new Phrases(dialogTexts["map-1"]["npc-2"])
    );

    const map1Npc2Interactable = new InteractableDecorator(
      map1Npc2Companion,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_2_INTERACTION_TILE_ID,
      (self) => {
        const npcPhrase = (self.getSubject() as CompanionDecorator)
          .getPhrases()
          .getPhrase(0);
        DialogsController.getDialog("text-dialog").handleDialogShow(npcPhrase);
      }
    );

    await (await map1Npc2Interactable.init()).getSubject().init({
      src: NPC_IMAGES.MAP_1_NPC_2_IMAGE,
      numberOfFrames: 9,
      framesOfInterest: [0, 8],
    });

    map1InteractableController.addInteractable(map1Npc2Interactable);

    const map1Npc3 = new NPC({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_3_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_3_OFFSET_Y,
      animationThrottleMs: 50,
    });
    const map1Npc3Companion = new CompanionDecorator(
      map1Npc3,
      new Phrases(dialogTexts["map-1"]["npc-3"])
    );
    const map1Npc3Interactable = new InteractableDecorator(
      map1Npc3Companion,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_NPC_3_INTERACTION_TILE_ID,
      (self) => {
        const npcPhrase = (self.getSubject() as CompanionDecorator)
          .getPhrases()
          .getPhrase(0);
        DialogsController.getDialog("text-dialog").handleDialogShow(npcPhrase);
      }
    );

    await (await map1Npc3Interactable.init()).getSubject().init({
      src: NPC_IMAGES.MAP_1_NPC_3_IMAGE,
      numberOfFrames: 12,
      framesOfInterest: [6, 11],
    });

    map1InteractableController.addInteractable(map1Npc3Interactable);

    const map1Computer1 = new ObjectOnMap({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_1_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_1_OFFSET_Y,
    });

    const map1Computer1Interactable = new InteractableDecorator(
      map1Computer1,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_1_INTERACTION_TILE_ID,
      () => {
        DialogsController.getDialog("markup-dialog").handleDialogShow(
          project1Template
        );
      }
    );

    // todo akicha: makes no sense to pass the sprite parameters for the interactable without sprite
    await (await map1Computer1Interactable.init())
      .getSubject()
      .init({ src: "", numberOfFrames: 1, framesOfInterest: [] });

    map1InteractableController.addInteractable(map1Computer1Interactable);

    const map1Computer2 = new ObjectOnMap({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_2_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_2_OFFSET_Y,
    });

    const map1Computer2Interactable = new InteractableDecorator(
      map1Computer2,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_COMPUTER_2_INTERACTION_TILE_ID,
      () => {
        DialogsController.getDialog("markup-dialog").handleDialogShow(
          project2Template
        );
      }
    );

    await (await map1Computer2Interactable.init())
      .getSubject()
      .init({ src: "", numberOfFrames: 1, framesOfInterest: [] });

    map1InteractableController.addInteractable(map1Computer2Interactable);

    const map1Bookshelf1 = new ObjectOnMap({
      x:
        Map.initialImageOffsetX +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_BOOKSHELF_1_OFFSET_X,
      y:
        Map.initialImageOffsetY +
        MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_BOOKSHELF_1_OFFSET_Y,
    });

    const map1Bookshelf1Interactable = new InteractableDecorator(
      map1Bookshelf1,
      MAP_INTERACTABLE_CONTROLLER_ENUMS.MAP_1_BOOKSHELF_1_INTERACTION_TILE_ID,
      () => {
        DialogsController.getDialog("markup-dialog").handleDialogShow(
          bookshelfTemplate
        );
      }
    );

    await (await map1Bookshelf1Interactable.init())
      .getSubject()
      .init({ src: "", numberOfFrames: 1, framesOfInterest: [] });

    map1InteractableController.addInteractable(map1Bookshelf1Interactable);

    MapInteractableController.interactablesOnMap["map-1"] =
      map1InteractableController;
  }

  static selectInteractablesOnCurrentMap() {
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
