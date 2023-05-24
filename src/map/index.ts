import firstOfficeMapImage from "./assets/images/first-office.png";
import { Canvas } from "../canvas";
import { MAP_ENUMS } from "./enums";
import { Sprite } from "../sprite";

export class Map {
  static initialImageOffsetX: number;
  static initialImageOffsetY: number;
  static imageOffsetX: number;
  static imageOffsetY: number;
  static sprite = new Sprite(firstOfficeMapImage);

  static async init() {
    await this.sprite.init();

    Map.initialImageOffsetX =
      Canvas.getCanvas().width / 2 -
      (this.sprite.getImage().width / 2 + MAP_ENUMS.TILE_SIZE);

    Map.initialImageOffsetY =
      Canvas.getCanvas().height / 2 -
      (this.sprite.getImage().height / 2 +
        MAP_ENUMS.STARTING_POINT_Y_OFFSET_FROM_TOP_OF_MAP);

    Map.imageOffsetX = Map.initialImageOffsetX;
    Map.imageOffsetY = Map.initialImageOffsetY;
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
