import { NPC } from "../interfaces";
import { CompanionNpc } from "./interfaces";
import { Phrases } from "../../phrases";

export class CompanionDecorator implements NPC {
  private npc: CompanionNpc;
  private readonly phrases: Phrases;
  constructor(npc: CompanionNpc, phrases: Phrases) {
    this.npc = npc;
    this.phrases = phrases;
  }
  async init(
    { src, numberOfFrames, framesOfInterest } = {
      src: "",
      numberOfFrames: 1,
      framesOfInterest: [] as number[],
    }
  ) {
    return this.npc.init({ src, numberOfFrames, framesOfInterest });
  }
  updateAnimationSpriteFrame() {
    return this.npc.updateAnimationSpriteFrame();
  }

  draw() {
    return this.npc.draw();
  }
  getX() {
    return this.npc.getX();
  }
  setX(x: number) {
    return this.npc.setX(x);
  }
  getY() {
    return this.npc.getY();
  }
  setY(y: number) {
    return this.npc.setY(y);
  }

  getPhrases() {
    return this.phrases;
  }
}
