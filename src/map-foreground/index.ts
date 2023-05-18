import firstOfficeMapForegroundImage from "./assets/images/first-office-foreground.png";
import { Canvas } from "../canvas";
import { MAP_ENUMS } from "../map/enums";

// TODO akicha: create a Sprite class
export class MapForeground {
  static mapForeground: HTMLImageElement;

  static imageOffsetX = MAP_ENUMS.INITIAL_MAP_POSITION_X;
  static imageOffsetY = MAP_ENUMS.INITIAL_MAP_POSITION_Y;

  static init() {
    return new Promise<void>((resolve, reject) => {
      const mapForeground = new Image();
      mapForeground.src = firstOfficeMapForegroundImage;
      MapForeground.mapForeground = mapForeground;
      mapForeground.onload = function handleImageLoaded() {
        MapForeground.draw();
        resolve();
      };
      mapForeground.onerror = reject;
    });
  }

  static draw() {
    Canvas.getCtx().drawImage(
      MapForeground.mapForeground,
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
