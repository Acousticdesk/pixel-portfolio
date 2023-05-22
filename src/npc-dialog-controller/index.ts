import { PlayerForumAreaCollisionController } from "../player-forum-area-collision-controller";
import { MapNPCController } from "../map-npc-controller";
import { CompanionDecorator } from "../npc/decorators";

export class NpcDialogController {
  static trySpeakToAnyone() {
    const forumArea = PlayerForumAreaCollisionController.findCollisionTile();

    // todo akicha: to a separate method
    MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter((npc) => npc instanceof CompanionDecorator)
      // @ts-ignore
      .forEach((npc) => npc.restrictToTalkTo());

    if (!forumArea) {
      return;
    }

    // todo akicha
    const companion = NpcDialogController.findCompanionResponsibleForForumArea(
      // @ts-ignore
      forumArea.value
    );

    if (!companion) {
      return;
    }

    // @ts-ignore
    companion.allowToTalkTo();
  }

  // todo akicha: should be handled in a separate controller
  private static findCompanionResponsibleForForumArea(forumAreaId: number) {
    const companions = MapNPCController.selectNPCsOnCurrentMap()
      .getNPCs()
      .filter((npc) => npc instanceof CompanionDecorator);

    // todo akicha
    return companions.find(
      // @ts-ignore
      (companion) => companion.getForumAreaId() === forumAreaId
    );
  }
}
