import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";

export class Boundary {
  x: number;
  y: number;
  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }
  draw() {
    const ctx = Canvas.getCtx();

    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x + MAP_ENUMS.INITIAL_MAP_POSITION_X,
      this.y + MAP_ENUMS.INITIAL_MAP_POSITION_Y,
      MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100),
      MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100)
    );
  }
}
