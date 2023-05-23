import { PlayerDialogAreaCollisionController } from "../player-dialog-area-collision-controller";
import { MapNPCController } from "../map-npc-controller";
import { CompanionDecorator } from "../npc/decorators";

export class NpcDialogController {
  static trySpeakToAnyone() {
    const dialogArea = PlayerDialogAreaCollisionController.findCollisionTile();

    // todo akicha: to a separate method
    MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter((npc) => npc instanceof CompanionDecorator)
      // @ts-ignore
      .forEach((npc) => npc.restrictToTalkTo());

    if (!dialogArea) {
      return;
    }

    // todo akicha
    const companion = NpcDialogController.findCompanionResponsibleForDialogArea(
      // @ts-ignore
      dialogArea.value
    );

    if (!companion) {
      return;
    }

    // @ts-ignore
    companion.allowToTalkTo();
  }

  // todo akicha: should be handled in a separate controller
  private static findCompanionResponsibleForDialogArea(dialogAreaId: number) {
    const companions = MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter((npc) => npc instanceof CompanionDecorator);

    // todo akicha
    return companions.find(
      // @ts-ignore
      (companion) => companion.getDialogAreaId() === dialogAreaId
    );
  }
}
