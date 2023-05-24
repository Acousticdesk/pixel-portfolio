import firstOfficeMapImage from "./assets/images/first-office.png";
import { Canvas } from "../canvas";
import { MAP_ENUMS } from "./enums";
import { Sprite } from "../sprite";

export class Map {
  static imageOffsetX = MAP_ENUMS.INITIAL_MAP_POSITION_X;
  static imageOffsetY = MAP_ENUMS.INITIAL_MAP_POSITION_Y;
  static sprite = new Sprite(firstOfficeMapImage);

  static init() {
    return this.sprite.init();
  }

  static draw() {
    Canvas.getCtx().drawImage(
      Map.sprite.getImage(),
      Map.imageOffsetX,
      Map.imageOffsetY
    );
  }

  static setImageOffsetX(x: number) {
    Map.imageOffsetX = x;
  }

  static setImageOffsetY(y: number) {
    Map.imageOffsetY = y;
  }
}
