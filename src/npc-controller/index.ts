import { NPC } from "../npc/interfaces";

export class NPCController {
  private npcs: NPC[] = [];

  addNPC(npc: NPC) {
    this.npcs.push(npc);
  }

  updateIdlingPosition() {
    this.npcs.forEach((npc) => npc.updateIdlingPosition());
    return this;
  }

  draw() {
    this.npcs.forEach((npc) => npc.draw());
    return this;
  }

  getNPCs() {
    return this.npcs;
  }
}
