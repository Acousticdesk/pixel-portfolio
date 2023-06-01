import { Canvas } from "../canvas";
import { NPC_CONSTS } from "./consts";
import { Movable } from "../movables-controller/interfaces";
import { Sprite } from "../sprite";
import { Animatable } from "../animatable/interfaces";
import { Drawable } from "../drawable/interfaces";
import { Initable } from "../initable/interfaces";

// NPC stands for Non-Playable Character
export class NPC
  implements
    Movable,
    Animatable,
    Drawable,
    Initable<
      { src: string; numberOfFrames: number; framesOfInterest: number[] },
      Promise<void>
    >
{
  private x: number;
  private y: number;
  private SINGLE_PRESET_WIDTH?: number;
  // private currentAnimationFrameIndex = NPC_CONSTS.IDLING_DOWN_SPRITE_INDEX[0];
  private currentAnimationFrameIndex: number = 0;
  private framesOfInterest: number[] = [];
  private lastIdleSpriteChange = Date.now();
  private animationThrottleMs;
  private sprite!: Sprite;

  constructor({
    x,
    y,
    animationThrottleMs,
  }: {
    x: number;
    y: number;
    animationThrottleMs: number;
  }) {
    this.x = x;
    this.y = y;
    this.animationThrottleMs = animationThrottleMs;
  }

  // todo akicha 1: create a sprite separately from the initializer
  async init(
    { src, numberOfFrames, framesOfInterest } = {
      src: "",
      numberOfFrames: 1,
      framesOfInterest: [] as number[],
    }
  ) {
    this.sprite = new Sprite(src);
    await this.sprite.init();
    this.SINGLE_PRESET_WIDTH = this.sprite.getImage().width / numberOfFrames;
    this.framesOfInterest = framesOfInterest;
    this.currentAnimationFrameIndex = framesOfInterest[0];
  }

  updateAnimationSpriteFrame() {
    const idleAnimationShouldThrottle =
      Date.now() - this.lastIdleSpriteChange <= this.animationThrottleMs;

    if (idleAnimationShouldThrottle) {
      return;
    }
    // const spriteIndexRange = NPC_CONSTS.IDLING_DOWN_SPRITE_INDEX;
    const spriteIndexRange = this.framesOfInterest;
    this.currentAnimationFrameIndex += 1;
    if (this.currentAnimationFrameIndex > spriteIndexRange[1]) {
      this.currentAnimationFrameIndex = spriteIndexRange[0];
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
      this.currentAnimationFrameIndex * this.SINGLE_PRESET_WIDTH,
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
