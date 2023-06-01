import { PlayerInteractionAreaCollisionController } from "../player-interaction-area-collision-controller";
import { MapInteractableController } from "../map-interactable-controller";
import { NPC } from "../npc/interfaces";
import { Keyboard } from "../keyboard";
import { InteractableDecorator } from "../interactable/decorators";

export class PlayerInteractionAreaController {
  private static isInteractableNPC(npc: NPC): npc is InteractableDecorator {
    return npc instanceof InteractableDecorator;
  }
  static trySpeakToAnyone() {
    const interactionArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    MapInteractableController.selectNPCsOnCurrentMap()
      .addInteractables()
      .filter(PlayerInteractionAreaController.isInteractableNPC)
      .forEach((npc) => npc.restrictToInteractWith());

    if (!interactionArea) {
      return;
    }

    const companion =
      PlayerInteractionAreaController.findCompanionResponsibleForInteractionArea(
        interactionArea.value
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

    const interactionArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    if (!interactionArea) {
      return;
    }

    const interactable =
      PlayerInteractionAreaController.findCompanionResponsibleForInteractionArea(
        interactionArea.value
      );

    if (!interactable) {
      return;
    }

    interactable.interact();
  }

  private static findCompanionResponsibleForInteractionArea(
    interactionAreaId: number
  ) {
    const companions = MapInteractableController.selectNPCsOnCurrentMap()
      .addInteractables()
      .filter(PlayerInteractionAreaController.isInteractableNPC);

    return companions.find(
      (companion) => companion.getInteractionAreaId() === interactionAreaId
    );
  }
}
