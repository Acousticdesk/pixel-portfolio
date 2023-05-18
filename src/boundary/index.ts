import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";

export class Boundary {
  static draw({ x, y }: { x: number; y: number }) {
    const ctx = Canvas.getCtx();

    ctx.fillStyle = "red";
    ctx.fillRect(
      x + MAP_ENUMS.INITIAL_MAP_POSITION_X,
      y + MAP_ENUMS.INITIAL_MAP_POSITION_Y,
      MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100),
      MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100)
    );
  }
}
