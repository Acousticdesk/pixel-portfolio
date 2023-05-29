import { PlayerDialogAreaCollisionController } from "../player-dialog-area-collision-controller";
import { MapNPCController } from "../map-npc-controller";
import { CompanionDecorator } from "../npc/decorators";
import { NPC } from "../npc/interfaces";
import { Keyboard } from "../keyboard";
import { NpcDialogUiController } from "../npc-dialog-ui-controller";

export class NPCDialogController {
  static isCompanionNPC(npc: NPC): npc is CompanionDecorator {
    return npc instanceof CompanionDecorator;
  }
  static trySpeakToAnyone() {
    const dialogArea = PlayerDialogAreaCollisionController.findCollisionTile();

    MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(NPCDialogController.isCompanionNPC)
      .forEach((npc) => npc.restrictToTalkTo());

    if (!dialogArea) {
      return;
    }

    const companion = NPCDialogController.findCompanionResponsibleForDialogArea(
      dialogArea.value
    );

    if (!companion) {
      return;
    }

    companion.allowToTalkTo();
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

    if (!companion) {
      return;
    }

    NpcDialogUiController.handleDialogShow(companion.getPhrases().getPhrase(0));
  }

  private static findCompanionResponsibleForDialogArea(dialogAreaId: number) {
    const companions = MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter(NPCDialogController.isCompanionNPC);

    return companions.find(
      (companion) => companion.getDialogAreaId() === dialogAreaId
    );
  }
}
