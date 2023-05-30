import { PlayerDialogAreaCollisionController } from "../player-dialog-area-collision-controller";
import { MapNPCController } from "../map-npc-controller";
import { CompanionDecorator } from "../npc/decorators";
import { NPC } from "../npc/interfaces";
import { Keyboard } from "../keyboard";
import { NpcDialogUiController } from "../npc-dialog-ui-controller";
import { InteractableDecorator } from "../interactable/decorators";

// todo akicha 1: rename to interaction-controller
export class NPCDialogController {
  // todo akicha 1: not only Npc can be interactable
  private static isInteractableNPC(npc: NPC): npc is InteractableDecorator {
    return npc instanceof InteractableDecorator;
  }
  private static isCompanionNPC(npc: NPC): npc is CompanionDecorator {
    return npc instanceof CompanionDecorator;
  }
  static trySpeakToAnyone() {
    const dialogArea = PlayerDialogAreaCollisionController.findCollisionTile();

    MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(NPCDialogController.isInteractableNPC)
      .forEach((npc) => npc.restrictToInteractWith());

    if (!dialogArea) {
      return;
    }

    const companion = NPCDialogController.findCompanionResponsibleForDialogArea(
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

    const dialogArea = PlayerDialogAreaCollisionController.findCollisionTile();

    if (!dialogArea) {
      return;
    }

    const companion = NPCDialogController.findCompanionResponsibleForDialogArea(
      dialogArea.value
    );

    if (!companion || !NPCDialogController.isCompanionNPC(companion)) {
      return;
    }

    NpcDialogUiController.handleDialogShow(companion.getPhrases().getPhrase(0));
  }

  private static findCompanionResponsibleForDialogArea(dialogAreaId: number) {
    const companions = MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(NPCDialogController.isInteractableNPC);

    return companions.find(
      (companion) => companion.getInteractionAreaId() === dialogAreaId
    );
  }
}
