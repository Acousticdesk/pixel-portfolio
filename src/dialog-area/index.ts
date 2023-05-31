import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";
import { InteractionTile } from "../interaction-tile";
import { Movable } from "../movables-controller/interfaces";

// todo akicha 1: rename to Interaction Area
export class DialogArea implements InteractionTile, Movable {
  x: number;
  y: number;
  value: number;
  static size = MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);
  constructor({ x, y, value }: { x: number; y: number; value: number }) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
  draw() {
    const ctx = Canvas.getCtx();

    ctx.fillStyle = "rgba(0, 255, 0, 0)";
    ctx.fillRect(
      this.x + MAP_ENUMS.INITIAL_MAP_POSITION_X,
      this.y + MAP_ENUMS.INITIAL_MAP_POSITION_Y,
      DialogArea.size,
      DialogArea.size
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
