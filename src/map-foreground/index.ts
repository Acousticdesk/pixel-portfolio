import firstOfficeMapForegroundImage from "./assets/images/first-office-foreground.png";
import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";
import { Sprite } from "../sprite";

export class MapForeground {
  static imageOffsetX = MAP_ENUMS.INITIAL_MAP_POSITION_X;
  static imageOffsetY = MAP_ENUMS.INITIAL_MAP_POSITION_Y;

  static sprite = new Sprite(firstOfficeMapForegroundImage);

  static async init() {
    await this.sprite.init();
    this.draw();
  }

  static draw() {
    Canvas.getCtx().drawImage(
      this.sprite.getImage(),
      MapForeground.imageOffsetX,
      MapForeground.imageOffsetY
    );
  }

  static setImageOffsetX(x: number) {
    MapForeground.imageOffsetX = x;
  }

  static setImageOffsetY(y: number) {
    MapForeground.imageOffsetY = y;
  }
}
