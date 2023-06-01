import { PlayerInteractionAreaCollisionController } from "../player-interaction-area-collision-controller";
import { MapInteractableController } from "../map-interactable-controller";
import { NPC } from "../npc/interfaces";
import { Keyboard } from "../keyboard";
import { InteractableDecorator } from "../interactable/decorators";

export class PlayerInteractionAreaController {
  // todo akicha 1: not only Npc can be interactable
  private static isInteractableNPC(npc: NPC): npc is InteractableDecorator {
    return npc instanceof InteractableDecorator;
  }
  static trySpeakToAnyone() {
    const dialogArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    MapInteractableController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(PlayerInteractionAreaController.isInteractableNPC)
      .forEach((npc) => npc.restrictToInteractWith());

    if (!dialogArea) {
      return;
    }

    const companion =
      PlayerInteractionAreaController.findCompanionResponsibleForInteractionArea(
        dialogArea.value
      );

    if (!companion) {
      return;
    }

    companion.allowToInteractWith();
  }

  static talk() {
    if (!Keyboard.keys[" "].pressed) {
      return;
    }

    const dialogArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    if (!dialogArea) {
      return;
    }

    const interactable =
      PlayerInteractionAreaController.findCompanionResponsibleForInteractionArea(
        dialogArea.value
      );

    if (!interactable) {
      return;
    }

    interactable.interact();
  }

  private static findCompanionResponsibleForInteractionArea(
    dialogAreaId: number
  ) {
    const companions = MapInteractableController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(PlayerInteractionAreaController.isInteractableNPC);

    return companions.find(
      (companion) => companion.getInteractionAreaId() === dialogAreaId
    );
  }
}
