import { NPC } from "../npc/interfaces";
import { Movable } from "../movables-controller/interfaces";

export class NPCController {
  private npcs: (NPC & Movable)[] = [];

  addNPC(npc: NPC & Movable) {
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
