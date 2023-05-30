import { NPC_ENUMS } from "./enums";
import { Canvas } from "../canvas";
import { NPC_CONSTS } from "./consts";
import { Movable } from "../movables-controller/interfaces";
import { Sprite } from "../sprite";
import { Animatable } from "../animatable/interfaces";
import { Drawable } from "../drawable/interfaces";
import { Initable } from "../initable/interfaces";

// NPC stands for Non-Playable Character
export class NPC
  implements Movable, Animatable, Drawable, Initable<string, Promise<void>>
{
  private x: number;
  private y: number;
  private SINGLE_PRESET_WIDTH?: number;
  private currentIdleSpriteIndex = NPC_CONSTS.IDLING_DOWN_SPRITE_INDEX[0];
  private lastIdleSpriteChange = Date.now();
  private sprite!: Sprite;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  // todo akicha 1:
  // @ts-ignore
  async init(base64String: string) {
    this.sprite = new Sprite(base64String);
    await this.sprite.init();
    this.SINGLE_PRESET_WIDTH =
      this.sprite.getImage().width / NPC_ENUMS.NUMBER_OF_IDLE_SPRITE_PRESETS;
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
    const npcImage = this.sprite.getImage();
    if (!npcImage || !this.SINGLE_PRESET_WIDTH) {
      throw new Error(
        "NPC object was never initialized. Please call npc.init() method"
      );
    }
    Canvas.getCtx().drawImage(
      npcImage,
      this.currentIdleSpriteIndex * this.SINGLE_PRESET_WIDTH,
      0,
      this.SINGLE_PRESET_WIDTH,
      npcImage.height,
      this.x,
      this.y,
      this.SINGLE_PRESET_WIDTH,
      npcImage.height
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
