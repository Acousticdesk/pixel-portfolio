import firstOfficeMapImage from "./assets/images/first-office.png";
import { Canvas } from "../canvas";
import { MAP_ENUMS } from "./enums";

export class Map {
  static mapImage: HTMLImageElement;

  static imageOffsetX = MAP_ENUMS.INITIAL_MAP_POSITION_X;
  static imageOffsetY = MAP_ENUMS.INITIAL_MAP_POSITION_Y;

  static init() {
    return new Promise<void>((resolve, reject) => {
      const mapImage = new Image();
      mapImage.src = firstOfficeMapImage;
      Map.mapImage = mapImage;
      mapImage.onload = function handleImageLoaded() {
        Map.draw();
        resolve();
      };
      mapImage.onerror = reject;
    });
  }

  static draw() {
    Canvas.getCtx().drawImage(Map.mapImage, Map.imageOffsetX, Map.imageOffsetY);
  }

  static setImageOffsetX(x: number) {
    Map.imageOffsetX = x;
  }

  static setImageOffsetY(y: number) {
    Map.imageOffsetY = y;
  }
}
