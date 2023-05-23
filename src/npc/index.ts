import { NPC_ENUMS } from "./enums";
import { Canvas } from "../canvas";
import { NPC_CONSTS } from "./consts";
import { Movable } from "../movables-controller/interfaces";

// NPC stands for Non-Playable Character
export class NPC implements Movable {
  private x: number;
  private y: number;
  private SINGLE_PRESET_WIDTH?: number;
  private npcImage?: HTMLImageElement;
  private currentIdleSpriteIndex = NPC_CONSTS.IDLING_DOWN_SPRITE_INDEX[0];
  private lastIdleSpriteChange = Date.now();

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  init(base64String: string) {
    const npcImage = new Image();
    npcImage.src = base64String;
    this.npcImage = npcImage;

    return new Promise<void>((resolve, reject) => {
      npcImage.onload = () => {
        this.SINGLE_PRESET_WIDTH =
          npcImage.width / NPC_ENUMS.NUMBER_OF_IDLE_SPRITE_PRESETS;

        this.draw();
        resolve();
      };

      npcImage.onerror = (e) => {
        reject(e);
      };
    });
  }

  updateIdlingPosition() {
    const idleAnimationShouldThrottle =
      Date.now() - this.lastIdleSpriteChange <= 50;

    if (idleAnimationShouldThrottle) {
      return;
    }
    const spriteIndexRange = NPC_CONSTS.IDLING_DOWN_SPRITE_INDEX;
    this.currentIdleSpriteIndex += 1;
    if (this.currentIdleSpriteIndex > spriteIndexRange[1]) {
      this.currentIdleSpriteIndex = spriteIndexRange[0];
    }
    this.lastIdleSpriteChange = Date.now();
  }

  draw() {
    if (!this.npcImage || !this.SINGLE_PRESET_WIDTH) {
      throw new Error(
        "NPC object was never initialized. Please call npc.init() method"
      );
    }
    Canvas.getCtx().drawImage(
      this.npcImage,
      this.currentIdleSpriteIndex * this.SINGLE_PRESET_WIDTH,
      0,
      this.SINGLE_PRESET_WIDTH,
      this.npcImage.height,
      this.x,
      this.y,
      this.SINGLE_PRESET_WIDTH,
      this.npcImage.height
    );
  }

  getX() {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y: number) {
    this.y = y;
  }
}
