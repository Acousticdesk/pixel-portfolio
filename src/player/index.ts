import playerMovementSprite from "./assets/images/Alex_run_16x16.png";
import { PLAYER_ENUMS } from "./enums";
import { Canvas } from "../canvas";

export class Player {
  static init() {
    const playerImage = new Image();
    playerImage.src = playerMovementSprite;
    playerImage.onload = function handleImageLoaded() {
      const canvas = Canvas.getCanvas();
      const SINGLE_PRESET_WIDTH =
        playerImage.width / PLAYER_ENUMS.NUMBER_OF_MOVEMENT_SPRITE_PRESETS;
      Canvas.getCtx().drawImage(
        playerImage,
        0,
        0,
        SINGLE_PRESET_WIDTH,
        playerImage.height,
        canvas.width / 2 - SINGLE_PRESET_WIDTH / 2,
        canvas.height / 2 - SINGLE_PRESET_WIDTH / 2,
        SINGLE_PRESET_WIDTH,
        playerImage.height
      );
    };
  }
}
