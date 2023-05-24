import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";
import { InteractionTile } from "../interaction-tile";
import { Movable } from "../movables-controller/interfaces";
import { Map } from "../map";

export class Boundary implements InteractionTile, Movable {
  private x: number;
  private y: number;
  static size = MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);
  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }
  draw() {
    const ctx = Canvas.getCtx();

    // ctx.fillStyle = "red";
    ctx.fillStyle = "rgba(255, 0, 0, 0)";
    ctx.fillRect(
      this.x + Map.initialImageOffsetX,
      this.y + Map.initialImageOffsetY,
      Boundary.size,
      Boundary.size
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
