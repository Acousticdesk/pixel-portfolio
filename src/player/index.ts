import playerMovementSprite from "./assets/images/Alex_run_16x16.png";
import { Canvas } from "../canvas";

export class Player {
  static init() {
    const playerImage = new Image();
    playerImage.src = playerMovementSprite;
    playerImage.onload = function handleImageLoaded() {
      const canvas = Canvas.getCanvas();
      Canvas.getCtx().drawImage(
        playerImage,
        canvas.width / 2 - playerImage.width / 2,
        canvas.height / 2 - playerImage.height / 2
      );
    };
  }
}
