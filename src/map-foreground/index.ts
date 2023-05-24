import firstOfficeMapForegroundImage from "./assets/images/first-office-foreground.png";
import { Canvas } from "../canvas";
import { Sprite } from "../sprite";
import { Map } from "../map";

export class MapForeground {
  static imageOffsetX: number;
  static imageOffsetY: number;

  static sprite = new Sprite(firstOfficeMapForegroundImage);

  static async init() {
    await this.sprite.init();
    this.imageOffsetX = Map.initialImageOffsetX;
    this.imageOffsetY = Map.initialImageOffsetY;
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
