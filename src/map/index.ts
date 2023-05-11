import firstOfficeMapImage from '../assets/images/first-office.png'

// TODO akicha: replace static methods with instance methods
// as the game has more than one map
export class Map {
  static ctx: CanvasRenderingContext2D;
  static init() {
    const map = new Image();
    map.src = firstOfficeMapImage;
    map.onload = function handleImageLoaded() {
      Map.ctx.drawImage(map, 0, 0);
    }
  }
  static setCtx(ctx: CanvasRenderingContext2D) {
    Map.ctx = ctx;
  }
}
