import { Movable } from "../movables-controller/interfaces";
import { Animatable } from "../animatable/interfaces";
import { Drawable } from "../drawable/interfaces";
import { Initable } from "../initable/interfaces";

export class ObjectOnMap
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

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  init(_: { src: string; numberOfFrames: number; framesOfInterest: number[] }) {
    return Promise.resolve();
  }

  updateAnimationSpriteFrame() {}

  draw() {}

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
