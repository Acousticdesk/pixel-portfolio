import { Movable } from "../movables-controller/interfaces";
import { Animatable } from "../animatable/interfaces";
import { Drawable } from "../drawable/interfaces";
import { Initable } from "../initable/interfaces";

export class ObjectOnMap
  implements Movable, Animatable, Drawable, Initable<string, Promise<void>>
{
  private x: number;
  private y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  init(_: string) {
    return Promise.resolve();
  }

  // todo akicha 1: see if there is a need in this method
  updateAnimationSpriteFrame() {}

  // todo akicha 1: see if there is a need in this method
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
