import firstOfficeMapImage from './assets/images/first-office.png'
import { Canvas } from '../canvas';
import { MAP_ENUMS } from './enums';

// TODO akicha: replace static methods with instance methods
// as the game has more than one map
export class Map {
  static init() {
    return new Promise<void>((resolve, reject) => {
      const map = new Image();
      map.src = firstOfficeMapImage;
      map.onload = function handleImageLoaded() {
        Canvas.getCtx().drawImage(map, MAP_ENUMS.INITIAL_MAP_POSITION_X, MAP_ENUMS.INITIAL_MAP_POSITION_Y);
        resolve();
      }
      map.onerror = reject;
    });
  }
}
